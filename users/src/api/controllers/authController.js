import { UserRepository } from '../../data/repositories'
import { Controller, Post, Get, Delete } from '@decorators/express'
import config from '../../config/config'
import createToken from '../../utils/createToken'
import randToken from 'rand-token'
import redis from '../../config/redis'
import createError from 'http-errors'
import bcrypt from 'bcrypt'


@Controller('/authenticate')
class AuthController {

  constructor() {
    this.repository = new UserRepository()
  }

  @Post('/login')
  async login(req, res) {
    const loginUser = req.body

    const user = await this.repository.getUserByEmail(loginUser.email)
    if (user) {
      const validPassword = await bcrypt.compare(loginUser.password, user.password)
      if (validPassword) {
        const userModel = {
          id: user.id,
          email: user.email
        }
        await this.createTokenToUser(userModel)
        return res.send(userModel)
      } else {
        throw createError(409, 'Contraseña incorrecta')
      }
    } else {
      throw createError(409, 'Usuario no encontrado')
    }
  }

  @Post('/refreshToken')
  async refresh(req, res, next) {
    const { refreshToken } = req.body
    if (refreshToken) {
      redis.get(refreshToken, async(err, response) => {
        if (response) {
          const user = JSON.parse(response)
          if (user) {
            if (user.expiration >= Math.floor(Date.now() / 1000)) {
              const token = await createToken(user)
              const userModel = {
                id: user.id,
                email: user.email,
                token: token,
                refreshToken: refreshToken
              }
              return res.send(userModel)
            }
            return next(createError(403, 'Refresh token expirado'))
          }
        } else {
          return next(createError(403, 'Refresh token invalido'))
        }
      })
    } else {
      return next(createError(403, 'No fue posible obtener el refresh token'))
    }
  }
  
  @Post('/google')
  async googleAuth(req, res, next) {
    return res.send('Google ok!')
  }

  async createTokenToUser(user) {
    const data = { id: user.id, email: user.email }
    const token = await createToken(user)
    const refreshToken = randToken.uid(256)
    const expiration = Math.floor(Date.now() / 1000) + config.JWT_REFRESH_EXPIRATION * 3600
    user.token = token
    user.refreshToken = refreshToken
    redis.set(refreshToken, JSON.stringify({ ...data, expiration }), redis.print)
  }
  
}

module.exports = AuthController