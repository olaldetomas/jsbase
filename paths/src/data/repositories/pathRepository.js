import Path from '../models/Path'
import BaseRepository from './baseRepository'

class PathRepository extends BaseRepository {
  constructor() {
    super(Path)
    this.model = Path
  }

  async getAll() {
    const paths = await this.model.find().populate('marker')
    return paths
  }

  async getById(id) {
    const path = await this.model.findById(id).populate('marker')
    return path
  }

}

module.exports = PathRepository
