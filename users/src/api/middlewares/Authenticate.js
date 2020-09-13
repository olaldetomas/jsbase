/**
 * Middleware encargado de validar el token del usuario que 
 * lo obtiene consultando el header de cada request
 */
import jwt from 'jsonwebtoken'
import createError from 'http-errors'
import config from '../../config/config'

class Authenticate {

  constructor() { }

  async validateAccessToken(req) {
    try {
      const token = await this.extractToken(req)
      if (token) {
        try {
          const decoded = jwt.verify(token, config.JWT_SECRET)
          if (!decoded) throw createError(401, 'Token invalido')
          const user = { email: decoded.data.email, rol: decoded.data.rol, centerId: decoded.data.centerId }
          return user
        } catch {
          throw createError(401, 'Token invalido')
        }
      }
      else {
        throw createError(401, 'Token invalido')
      }
    } catch (error) {
      throw createError(401, 'Token invalido')
    }
  }

  async use(req, res, next) {
    try {
      const user = await this.validateAccessToken(req)
      req.user = user
      next()
    } catch (e) {
      return next(e)
    }
  }

  async extractToken(request) {
    const authorization = request.headers['authorization'] || req.query.token || req.body.token,
          token = authorization && authorization.replace('Bearer ', '')
    return token
  }

}

module.exports = Authenticate
