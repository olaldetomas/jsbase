import 'reflect-metadata'
import 'regenerator-runtime'
import Server from './1-api/server'

const app = new Server()
app.start()