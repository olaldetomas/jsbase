// import config from '../../config/config'
import User from '../models/User'
import BaseRepository from './baseRepository'

class UserRepository extends BaseRepository {

  constructor() {
    super(User)
  }

}

module.exports = UserRepository