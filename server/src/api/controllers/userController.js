import { UserRepository } from '../../data/repositories'
import { Controller } from '@decorators/express'
// import { UserModel } from '../models/user'
// import createError from 'http-errors'


@Controller('/user')
class UserController {

  constructor() {
    this._repository = new UserRepository()
  }

  // @Post('/')
  // async create(req, res, next) {
  // }

  // @Put('/')
  // async update(req, res, next) {
  // }

  // @Delete('/:id(\[0-9]+)')
  // async delete(req, res) {
  // }

  // @Get('/:id(\[0-9]+)')
  // async getById(req, res, next) {
  // }

}

module.exports = UserController