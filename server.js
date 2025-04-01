import express from 'express'
const app = express()
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.json())
app.use(express.static(path.join(__dirname, './frontend/dist')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname('./frontend/dist/index.html')))
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))
