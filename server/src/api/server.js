/**
 * Parametros de configuración para el server
 */
import express from 'express'
import Routes from './routes'
import config from '../config/config'
import path from 'path'
import 'regenerator-runtime'

class Server {

  constructor() {
    this.express = express()
  }

  async start() {
    this.express.use(express.urlencoded({ extended: true }))
    const routes = new Routes(this.express)
    await routes.createRoutes()
    // Despliegue a producción
    if (process.env.NODE_ENV === 'production') {
      this.express.use(express.static(path.resolve(__dirname, '../public/dist')))
      this.express.get(/.*/, (req, res) => res.sendFile(path.resolve(__dirname, '../public/dist/index.html')))
    }
    this.express.listen(config.PORT, () => {
      console.log('Server on port: ' + config.PORT)
    })
  }

}

module.exports = Server
