import express from 'express'
const app = express()
import path from 'path'
import { fileURLToPath } from 'url'
import jwt from 'jsonwebtoken'
import config from 'config'
import auth from './middleware/auth.js'
import bcrypt from 'bcrypt'

if (!config.get('jwtPrivateKey')) {
  throw new Error('FATAL ERROR: jwtPrivateKey is not defined.')
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let users = []
let products = [
  { id: '1', name: 'Microwave', price: 50 },
  { id: '2', name: 'Television', price: 200 },
  { id: '3', name: 'Toaster', price: 30 },
]

app.use(express.json())
app.use(express.static(path.join(__dirname, './frontend/dist')))

app.get('/api/auth/userDetails', auth, (req, res) => {
  res.status(200)
  res.send(req.user)
})

app.post('/api/auth/login', async (req, res) => {
  const user = users.find((obj) => obj.username == req.body.username)
  if (!user) return res.status(400).send('Invalid username or password')

  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if (!validPassword)
    return res.status(400).send('Invalid username or password')

  const token = jwt.sign(user, config.get('jwtPrivateKey'))
  res.send({ token: token })
})

app.post('/api/auth/register', async (req, res) => {
  let user = { username: req.body.username, password: req.body.password }
  if (!(!!user.username && !!user.password))
    return res.status(400).send('Missing username or password')

  const alreadyExists = !!users.find((obj) => obj.username == req.body.username)
  if (alreadyExists) return res.status(400).send('Username is already in use')

  const salt = await bcrypt.genSalt(10)
  user.password = await bcrypt.hash(user.password, salt)

  users = [...users, user]

  const token = jwt.sign(user, config.get('jwtPrivateKey'))
  res.send({ token: token })
})

app.get('/api/products', async (req, res) => {
  res.send(products)
})

app.get('/api/search', async (req, res) => {
  const searchText = req.query.text

  res.send(
    products.filter(
      (product) =>
        !searchText ||
        product.name.toLowerCase().includes(searchText.toLowerCase())
    )
  )
})

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, './frontend/dist/admin.html'))
})

app.get('/*splat', (req, res) => {
  res.sendFile(path.join(__dirname, './frontend/dist/index.html'))
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))
