import { UserRepository } from '../../data/repositories'
import { Controller, Post, Get, Delete } from '@decorators/express'
import config from '../../config/config'
import createToken from '../../utils/createToken'
import randToken from 'rand-token'
import redis from '../../config/redis'
import createError from 'http-errors'
import bcrypt from 'bcrypt'
import Authenticate from '../middlewares/Authenticate'

@Controller('/user')
class UserController {

  constructor() {
    this.repository = new UserRepository()
  }

  @Post('/')
  async create(req, res) {
    const user = await this.repository.create(req.body)
    const userModel = {
      id: user.id,
      email: user.email
    }
    await this.createTokenToUser(userModel)
    return res.send(userModel)
  }

  @Delete('/:id', [
    new Authenticate()
  ])
  async delete(req, res) {
    const id = req.params.id
    const result = await this.repository.delete(id)
    return res.send(result)
  }

  @Get('/', [
    new Authenticate()
  ])
  async getAll(req, res) {
    const models = await this.repository.getAll()
    return res.send(models)
  }

  @Get('/:id', [
    new Authenticate()
  ])
  async getById(req, res) {
    const id = req.params.id
    const user = await this.repository.getById(id)
    return res.send(user)
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