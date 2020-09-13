import 'reflect-metadata'
import 'regenerator-runtime'
import Server from './api/server'
import './config/redis'

const app = new Server()
app.start()