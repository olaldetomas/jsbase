import { Controller, Get, Post, Put, Delete } from '@decorators/express'
import { UserService } from '../../2-services'
import { UserModel } from '../models/user'
import createError from 'http-errors'
import Authenticate from '../middlewares/Authenticate'


@Controller('/user', [
  new Authenticate()
])
class UserController {

  constructor() {
    this._service = new UserService()
  }

  @Get('/')
  async getByFilters(req, res, next) {
    const filters = {
      page: req.query.page,
      itemsPerPage: req.query.itemsPerPage,
      firstName: req.query.firstName,
      startDate: req.query.startDate,
      endDate: req.query.endDate,
      centerId: req.user.centerId
    }
    this._service.getByFilters(filters).then(result => {
      if (result) {
        result.items = result.items.map(user => new UserModel(user))
        res.status(200).send(result)
      } else {
        next(createError(404, 'No se encontraron usuarios.'))
      }
    }).catch(() => {
      throw createError(500, 'Ocurrió un error al realizar esta acción.')
    })
  };

  @Post('/')
  async create(req, res, next) {
    const user = req.body,
          isValid = await this._service.validateCreate(user)
    if (isValid == true) {
      this._service.createUser(user).then(id => {
        if (id) {
          res.send(String(id))
        } else {
          next(createError(404, 'Error al crear el usuario.'))
        }
      }).catch(() => {
        throw createError(500, 'Ocurrió un error al realizar esta acción.')
      })
    }
  }

  @Put('/')
  async update(req, res) {
    const user = req.body,
          id = user.id,
          isValid = await this._service.validateUpdate(user)
    if (isValid == true) {
      this._service.update(id, user).then(entity => {
        if (entity) {
          let model = new UserModel(entity)
          res.status(200).send(model)
        } else {
          next(createError(404, 'No se pudo actualizar el usuario.'))
        }
      }).catch(() => {
        throw createError(500, 'Ocurrió un error al realizar esta acción.')
      })
    }
  }

  @Delete('/:id(\[0-9]+)')
  async delete(req, res) {
    const id = req.params.id
    this._service.delete(id, req.user.centerId).then(result => {
      if (result) {
        res.status(200).send(result)
      } else {
        next(createError(404, 'No se pudo eliminar el usuario.'))
      }
    }).catch(() => {
      throw createError(500, 'Ocurrió un error al realizar esta acción.')
    })
  }

  @Get('/:id(\[0-9]+)')
  async getById(req, res) {
    const id = req.params.id
    this._service.getById(id, req.user.centerId).then(entity => {
      if (entity) {
        let model = new UserModel(entity)
        res.status(200).send(model)
      } else {
        next(createError(404, 'No se pudo obtener el usuario.'))
      }
    }).catch(() => {
      throw createError(500, 'Ocurrió un error al realizar esta acción.')
    })
  }

  @Put('/logicalEnabled/:id')
  async logicalEnable(req, res, next) {
    let id = req.params.id
    this._service.logicalEnable(id, req.body.status, req.user.centerId).then(result => {
      if (result.raw.affectedRows > 0) {
        res.status(200).send(result)
      } else {
        next(createError(404, 'No se encontró el usuario.'))
      }
    }).catch(() => {
      throw createError(500, 'Ocurrió un error al realizar esta acción.')
    })
  }

}


module.exports = UserController