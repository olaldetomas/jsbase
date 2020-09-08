import { createConnection, getConnectionOptions } from '../data/models/node_modules/typeorm'
import config from './config'

const connection = getConnectionOptions(config.CONNECTION_NAME).then(opt => {
  createConnection(opt).then(function(connection) {
    if (connection.isConnected) {
      console.log('Database: ' + '\x1b[33mconnected\x1b[0m')
    };
    return connection
  }).catch(function(error) {
    console.log('Error: ', error)
  })
})

module.exports = connection