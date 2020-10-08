import { MarkerRepository } from '../../data/repositories'
import { Controller, Post, Get, Delete, Put } from '@decorators/express'
import Authenticate from '../middlewares/Authenticate'

@Controller('/marker')
class MarkerController {
  constructor() {
    this.repository = new MarkerRepository()
  }

  @Post('/')
  async create(req, res) {
    const marker = await this.repository.create(req.body)
    return res.send(marker)
  }

  @Get('/')
  async getAll(req, res) {
    const markers = await this.repository.getAll()
    return res.send(markers)
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
    const marker = await this.repository.getById(id)
    return res.send(marker)
  }

  @Put('/:id')
  async update(req, res) {
    const id = req.params.id
    const data = req.body
    const oldMarker = await this.repository.update(id, data)
    return res.send(oldMarker)
  }
}

module.exports = MarkerController
