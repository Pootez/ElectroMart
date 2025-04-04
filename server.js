import express from 'express'
const app = express()
import path from 'path'
import { fileURLToPath } from 'url'
import jwt from 'jsonwebtoken'
import config from 'config'
import auth from './middleware/auth.js'
import { users } from './models/users.js'

console.log('Key: ', config.get('jwtPrivateKey'))
if (!config.get('jwtPrivateKey')) {
  throw new Error('FATAL ERROR: jwtPrivateKey is not defined.')
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.json())
app.use(express.static(path.join(__dirname, './frontend/dist')))

app.get('/api/auth/userDetails', auth, (req, res) => {
  res.status(200)
  res.send(req.user)
})

app.post('/api/auth/login', (req, res) => {
  const user = users.find(
    (obj) =>
      obj.username == req.body.username && obj.username == req.body.password
  )

  if (!user) return res.status(400).send('Invalid username or password')

  const token = jwt.sign(user, config.get('jwtPrivateKey'))
  res.send({token: token})
})

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, './frontend/dist/admin.html'))
})

app.get('/*splat', (req, res) => {
  res.sendFile(path.join(__dirname, './frontend/dist/index.html'))
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))
