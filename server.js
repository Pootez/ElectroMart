import express from 'express'
const app = express()
import path from 'path'
import { fileURLToPath } from 'url'
import auth from './middleware/auth.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.json())
app.use(express.static(path.join(__dirname, './frontend/dist')))

app.get('/api/auth/userDetails', auth, (req, res) => {
  res.status(200)
  res.send({ userDetails: { name: 'User1' } })
})

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, './frontend/dist/admin.html'))
})

app.get('/*splat', (req, res) => {
  res.sendFile(path.join(__dirname, './frontend/dist/index.html'))
})

const port = process.env.PORT || 25565
app.listen(port, () => console.log(`Listening on port ${port}...`))
