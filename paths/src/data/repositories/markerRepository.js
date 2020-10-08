import Marker from '../models/Marker'
import BaseRepository from './baseRepository'

class MarkerRepository extends BaseRepository {

  constructor() {
    super(Marker)
    this.model = Marker
  }

}

module.exports = MarkerRepository