const config = require('config')

module.exports = function () {
    if (!config.get('databaseUrl')) {
        throw new Error('FATAL ERROR: databaseUrl is not defined.')
    }

  if (!config.get('jwtPrivateKey')) {
    throw new Error('FATAL ERROR: jwtPrivateKey is not defined.')
  }

  if (config.get('jwtPrivateKey') === 'dev-jwt-key') {
    console.warn('WARNING: Using default dev JWT key.')
  }
}
