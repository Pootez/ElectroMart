const auth = require('./auth')

module.exports = [
  auth,
  (req, res, next) => {
    if (!req.user.isAdmin) return res.status(403).send('Admin only')
    next()
  },
]
