require('dotenv').config()

module.exports = {
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET || 'secretToken',
  JWT_EXPIRATION: process.env.JWT_EXPIRATION || 1, // Horas
  JWT_REFRESH_EXPIRATION: process.env.JWT_REFRESH_EXPIRATION || 72, // Horas
  REDIS_PORT: process.env.REDIS_PORT || 6379,
  REDIS_HOST: process.env.REDIS_HOST || '127.0.0.1',
  CONNECTION_NAME: process.env.CONNECTION_NAME || 'development',
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGODB_URL:
    process.env.MONGODB_URL ||
    'mongodb+srv://olaldetomas:test123@dev.jvmt4.gcp.mongodb.net/test?retryWrites=true&w=majority',
}