import { UserRepository } from '../../data/repositories'
import { Controller, Post, Get } from '@decorators/express'

@Controller('/user')
class UserController {

  constructor() {
    this._repository = new UserRepository()
  }

  @Post('/')
  async create(req, res) {
    const user = await this._repository.create(req.body)
    return res.send(user)
  }

  // @Put('/')
  // async update(req, res, next) {
  // }

  // @Delete('/:id(\[0-9]+)')
  // async delete(req, res) {
  // }

  // @Get('/:id(\[0-9]+)')
  // async getById(req, res) {

  // }

  @Get('/:id')
  async getAll(req, res) {
    const id = req.params.id
    const user = await this._repository.getById(id)
    return res.send(user)
  }

}

module.exports = UserController
