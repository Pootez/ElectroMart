const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function (req, res, next) {
  const token = req.header('auth-token')
  if (!token) return res.status(401).send('Access denied. No token provided.')

  try {
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'))
    if (Date.now() - decoded.timestamp * 1000 > 3 * 24 * 60 * 60 * 1000) {
      return res.status(401).send('Expired token.') // Token 3 days old
    }
    req.user = decoded
    next()
  } catch (ex) {
    res.status(400).send('Invalid token.')
  }
}
