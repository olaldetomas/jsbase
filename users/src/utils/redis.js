/**
 * Redis es una base de datos en memoria 
 */
import redis from 'redis'
import config from '../config/config'

module.exports = redis.createClient(config.REDIS_PORT, config.REDIS_HOST)
