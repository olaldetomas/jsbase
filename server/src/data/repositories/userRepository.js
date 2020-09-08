import config from '../../config/config'
import { User } from '../models/User'
import BaseRepository from './baseRepository'
import moment from 'moment'

class UserRepository extends BaseRepository {

  constructor() {
    super(User)
    this._entity = User
  }


}

module.exports = UserRepository