import mongoose from 'mongoose'
import config from './config'

mongoose.set('useFindAndModify', false)
mongoose.connect(config.MONGODB_URL || process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
})

mongoose.connection.on('connected', () => {
  console.log('Database \x1b[34mconnected\x1b[0m')
})

mongoose.connection.on('error', function(err) {
  console.log('Database \x1b[33merror\x1b[0m', err)
})

process.on('SIGINT', function() {
  mongoose.connection.close(function() {
    console.log('Mongoose default connection disconnected through app termination')
    process.exit(0)
  })
})