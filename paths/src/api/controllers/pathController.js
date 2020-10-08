import { PathRepository } from '../../data/repositories'
import { Controller, Post, Get, Delete, Put } from '@decorators/express'
import Authenticate from '../middlewares/Authenticate'

@Controller('/path')
class PathController {
  constructor() {
    this.repository = new PathRepository()
  }

  @Post('/')
  async create(req, res) {
    const path = await this.repository.create(req.body)
    return res.send(path)
  }

  @Get('/')
  async getAll(req, res) {
    const paths = await this.repository.getAll()
    return res.send(paths)
  }

  @Delete('/:id')
  async delete(req, res) {
    const id = req.params.id
    const result = await this.repository.delete(id)
    return res.send(result)
  }

  @Get('/:id')
  async getById(req, res) {
    const id = req.params.id
    const path = await this.repository.getById(id)
    return res.send(path)
  }

  @Put('/:id')
  async update(req, res) {
    const id = req.params.id
    const data = req.body
    const path = await this.repository.update(id, data)
    return res.send(path)
  }
}

module.exports = PathController
