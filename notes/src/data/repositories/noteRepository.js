import Note from '../models/Note'
import BaseRepository from './baseRepository'

class NotesRepository extends BaseRepository {

  constructor() {
    super(Note)
    this.model = Note
  }

}

module.exports = NotesRepository