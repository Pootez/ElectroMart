export default function (req, res, next) {
  const token = req.header('auth-token')
  if (!token) return res.status(401).send('Access denied. No token provided.')

  if (token == '1234') {
    next()
  } else {
    res.status(400).send('Invalid token.')
  }
}
