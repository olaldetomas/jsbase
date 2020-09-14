import jwt from 'jsonwebtoken'
import createError from 'http-errors'
import config from '../../config/config'

class Authenticate {

  constructor() { }

  async use(req, res, next) {
    const token = await this.extractToken(req)
    if (token) {
      jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
        if (decoded) next()
        else throw createError(401, 'No fue posible verificar el token')
      })
    } else {
      throw createError(401, 'No fue posible obtener el token')
    }
  }

  async extractToken(req) {
    const authorization = req.headers['authorization'] || req.query.token || req.body.token
    const token = authorization && authorization.replace('Bearer ', '')
    return token
  }

}

module.exports = Authenticate
