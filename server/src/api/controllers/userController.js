import { UserRepository } from '../../data/repositories'
import { Controller, Post } from '@decorators/express'

@Controller('/user')
class UserController {

  constructor() {
    this._repository = new UserRepository()
  }

  @Post('/')
  async create(req, res) {
    const user = req.body
    const createdUser = await this._repository.create(user)
    return res.send(createdUser)
  }

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