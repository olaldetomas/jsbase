// import config from '../../config/config'
import User from '../models/User'
import BaseRepository from './baseRepository'

class UserRepository extends BaseRepository {

  constructor() {
    super(User)
    this.model = User
  }

  async getUserByEmail(email) {
    const user = await this.model.findOne({ email: email })
    return user
  }

}

module.exports = UserRepository