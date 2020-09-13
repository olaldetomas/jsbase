import 'reflect-metadata'
import 'regenerator-runtime'
import Server from './api/server'

const app = new Server()
app.start()