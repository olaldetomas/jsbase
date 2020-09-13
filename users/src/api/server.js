/**
 * Parametros de configuración para el server
 */
import '../config/mongoose'
import 'regenerator-runtime'
import express from 'express'
import Routes from './routes'
import config from '../config/config'
import path from 'path'

class Server {

  constructor() {
    this.app = express()
  }

  async start() {
    this.app.use(express.urlencoded({ extended: true }))
    const routes = new Routes(this.app)

    if (process.env.NODE_ENV === 'production') {
      this.app.use(
        express.static(path.resolve(__dirname, '../public/dist'))
      )
      this.app.get(/.*/, (req, res) =>
        res.sendFile(path.resolve(__dirname, '../public/dist/index.html'))
      )
    }

    this.app.listen(config.PORT, () => {
      console.log('Server on port: ' + config.PORT)
    })
  }

}

module.exports = Server
