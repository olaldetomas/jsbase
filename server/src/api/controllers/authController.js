import { Controller, Get, Post } from '@decorators/express'
import createError from 'http-errors'
import createToken from '../../utils/createToken'
import randToken from 'rand-token'
import redis from '../../utils/redis'
import config from '../../config/config'
import { UserModel } from '../models/user'
import Authenticate from '../middlewares/Authenticate'

@Controller('/auth')
class AuthController {

  constructor() {
    this._repository = new UserService()
  }

  @Post('/login')
  async login(req, res) {
    const devUser = config.DEV_USER,
          devPassword = config.DEV_PASSWORD
    var user = null
    if (devUser == req.body.username && devPassword == req.body.password) {
      user = {
        id: 0,
        firstName: 'Admin',
        lastName: 'Admin',
        centerId: 1,
        rol: 1,
        email: req.body.username,
      }
    } else {
      user = await this._userService.getUserForAuth(req.body)
    }
    if (user) {
      const userModel = new UserModel(user),
            data = { id: user.id, email: user.email, rol: user.rol, centerId: user.centerId },
            token = await createToken(user),
            refreshToken = randToken.uid(256),
            expiration = Math.floor(Date.now() / 1000) + config.JWT_REFRESH_EXPIRATION * 3600
      userModel.token = token
      userModel.refreshToken = refreshToken
      redis.set(refreshToken, JSON.stringify({ ...data, expiration }), redis.print)
      res.send(userModel)
    } else {
      throw createError(409, 'Usuario no encontrado')
    }
  }

  @Post('/refresh')
  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.body
      if (refreshToken) {
        redis.get(refreshToken, async(err, response) => {
          if (err) {
            return next(createError(403, 'Refresh token invalido'))
          } else if (response) {
            const value = JSON.parse(response)
            if (value) {
              if (value.expiration >= Math.floor(Date.now() / 1000)) {
                const token = await createToken(value)
                return res.send({ token, refreshToken })
              }
              return next(createError(403, 'Refresh token expirado'))
            }
          } else {
            return next(createError(403, 'Refresh token invalido'))
          }
        })
      } else {
        return next(createError(403, 'Refresh token invalido'))
      }
    } catch {
      throw createError(403, 'No se puedo obtener el refresh token')
    }
  }

  @Get('/validate', [
    new Authenticate()
  ])
  async validate(req, res) {
    return res.send(true)
  }

}


module.exports = AuthController