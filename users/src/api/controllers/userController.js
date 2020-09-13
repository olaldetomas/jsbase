import { UserRepository } from '../../data/repositories'
import { Controller, Post, Get, Delete } from '@decorators/express'

@Controller('/user')
class UserController {

  constructor() {
    this.repository = new UserRepository()
  }

  @Post('/')
  async create(req, res) {
    const user = await this.repository.create(req.body)
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

}

module.exports = UserController
