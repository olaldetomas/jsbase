import express from 'express'
import { attachControllers } from '@decorators/express'
import bodyParser from 'body-parser'
import cors from 'cors'
import compression from 'compression'
import morgan from 'morgan'
import createError from 'http-errors'
import asyncHandler from 'express-async-handler'
import {
  UserController,
  AuthController,
} from './controllers'

class Routes {

  constructor(app) {
    this.app = app
  }

  async createRoutes() {
    const apiRouter = express.Router()
    apiRouter.use(cors())
    apiRouter.use(bodyParser.json())
    apiRouter.use(compression())
    apiRouter.use(morgan('dev'))

    attachControllers(apiRouter, [
      UserController,
      EnumController,
      AuthController,
    ])

    apiRouter.use((req, res, next) => {
      next(createError(404, 'Ruta no encontrada :('))
    })

    apiRouter.use((error, req, res, next) => {
      if (res.headersSent) {
        return next(error)
      }
      res.status(error.status || 500)
      res.json({
        status: error.status,
        message: error.message,
        stack: error.stack
      })
    })

    this.app.use('/api', asyncHandler(apiRouter))
  }

}

module.exports = Routes