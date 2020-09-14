import { NotesRepository } from '../../data/repositories'
import { Controller, Post } from '@decorators/express'
import createError from 'http-errors'
import Authenticate from '../middlewares/Authenticate'

@Controller('/note')
class NoteController {

  constructor() {
    this.repository = new NotesRepository()
  }

  @Post('/', [
    new Authenticate()
  ])
  async create(req, res) {
    const note = await this.repository.create(req.body)
    return res.send(note)
  }

}

module.exports = NoteController