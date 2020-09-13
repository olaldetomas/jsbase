import { UserRepository } from '../../data/repositories'
import { Controller, Post, Get, Delete } from '@decorators/express'
import createToken from '../../utils/createToken'
import redis from 'redis'

@Controller('/user')
class UserController {

  constructor() {
    this.repository = new UserRepository()
  }

  @Post('/')
  async create(req, res) {
    const user = await this.repository.create(req.body)
    await this.createTokenToUser(user)
    return res.send(user)
  }

  @Delete('/:id')
  async delete(req, res) {
    const id = req.params.id
    const result = await this.repository.delete(id)
    return res.send(result)
  }

  @Get('/')
  async getAll(req, res) {
    const models = await this.repository.getAll()
    return res.send(models)
  }

  @Get('/:id')
  async getById(req, res) {
    const id = req.params.id
    const user = await this.repository.getById(id)
    return res.send(user)
  }

  @Post('/login')
  async login(req, res) {
    const user = await this.repository.getUserForAuth(req.body)
    if (user) {
      await this.createTokenToUser(user)
      res.send(user)
    } else {
      throw createError(409, 'Usuario no encontrado')
    }
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

module.exports = UserController