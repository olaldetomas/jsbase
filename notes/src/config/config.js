require('dotenv').config()

module.exports = {
  PORT: process.env.PORT || 4000,
  JWT_SECRET: process.env.JWT_SECRET || 'secretToken',
  CONNECTION_NAME: process.env.CONNECTION_NAME || 'development',
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGODB_URL:
    process.env.MONGODB_URL ||
    'mongodb+srv://olaldetomas:test123@dev.jvmt4.gcp.mongodb.net/test?retryWrites=true&w=majority',
}