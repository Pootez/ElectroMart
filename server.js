const express = require('express')
const app = express()
const path = require('path')
const jwt = require('jsonwebtoken')
const config = require('config')
const auth = require('./middleware/auth.js')
const bcrypt = require('bcrypt')
const db = require('./startup/db.js')
const { productSelectionSQL, mapProductRow } = require('./utils/productUtils')


if (!config.get('jwtPrivateKey')) {
  throw new Error('FATAL ERROR: jwtPrivateKey is not defined.')
}

if (config.get('jwtPrivateKey') === 'dev-jwt-key') {
  console.warn('WARNING: Using default dev JWT key.')
}

require('./startup/initDB.js').checkAndInitDB()

app.use(express.json())
app.use(express.static(path.join(__dirname, './frontend/dist')))

app.get('/api/auth/userDetails', auth, async (req, res) => {
  try {
    const result = await db.query(
      `SELECT email, firstName, lastName, phoneNumber FROM users WHERE userID = $1`,
      [req.user.userID]
    )
    const userDetails = result.rows[0]
    res.send({ userDetails })
  } catch (err) {
    console.error(err)
    res.status(500).send('Internal server error')
  }
})

app.post('/api/auth/register', async (req, res) => {
  const { email, password, firstName, lastName, phoneNumber } = req.body
  if (!(email && password && firstName && lastName && phoneNumber))
    return res.status(400).send('Missing fields')

  try {
    const exists = await db.query('SELECT * FROM users WHERE email = $1', [
      email,
    ])
    if (exists.rows.length > 0)
      return res.status(400).send('Email already registered')

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const result = await db.query(
      `INSERT INTO users (email, password, firstName, lastName, phoneNumber, isAdmin)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING userID, email, isAdmin`,
      [email, hashedPassword, firstName, lastName, phoneNumber, false]
    )

    const user = result.rows[0]
    const token = jwt.sign(
      {
        userID: user.userid,
        email: user.email,
        isAdmin: user.isadmin,
      },
      config.get('jwtPrivateKey')
    )
    res.send({ token })
  } catch (err) {
    console.error(err)
    res.status(500).send('Internal server error')
  }
})

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body

  try {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [
      email,
    ])
    const user = result.rows[0]
    if (!user) return res.status(400).send('Invalid email or password')

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) return res.status(400).send('Invalid email or password')

    const token = jwt.sign(
      {
        userID: user.userid,
        email: user.email,
        isAdmin: user.isadmin,
      },
      config.get('jwtPrivateKey')
    )

    res.send({ token })
  } catch (err) {
    console.error(err)
    res.status(500).send('Internal server error')
  }
})

app.post('/api/auth/checkout', auth, async (req, res) => {
  const { items, address } = req.body
  if (!items?.length || !address)
    return res.status(400).send('Missing order items or address')

  try {
    const totalAmount = items.reduce((sum, item) => sum + item.subtotal, 0)

    const result = await db.query(
      `INSERT INTO orders (userID, totalAmount, orderDate, address, status)
       VALUES ($1, $2, NOW(), $3, 'pending')
       RETURNING ID`,
      [req.user.userID, totalAmount, address]
    )

    const orderId = result.rows[0].id

    for (const item of items) {
      await db.query(
        `INSERT INTO orderItem (orderID, productID, quantity, subtotal)
         VALUES ($1, $2, $3, $4)`,
        [orderId, item.productID, item.quantity, item.subtotal]
      )
    }

    res.send({ orderId })
  } catch (err) {
    console.error(err)
    res.status(500).send('Order failed')
  }
})

app.get('/api/product/:productId', async (req, res) => {
  try {
    const result = await db.query(
      `
      ${productSelectionSQL}
      WHERE p.ID = $1
      `,
      [req.params.productId]
    )
    res.send(result.rows[0] ? mapProductRow(result.rows[0]) : null)
  } catch (err) {
    console.error(err)
    res.status(500).send('Failed to fetch product')
  }
})

app.get('/api/products', async (req, res) => {
  try {
    const result = await db.query(productSelectionSQL)
    res.send(result.rows.map(mapProductRow))
  } catch (err) {
    console.error(err)
    res.status(500).send('Failed to fetch products')
  }
})

app.get('/api/search', async (req, res) => {
  const text = req.query.text || ''
  try {
    const result = await db.query(
      `
      ${productSelectionSQL}
      WHERE LOWER(p.name) LIKE $1
      `,
      [`%${text.toLowerCase()}%`]
    )
    res.send(result.rows.map(mapProductRow))
  } catch (err) {
    console.error(err)
    res.status(500).send('Search failed')
  }
})

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, './frontend/dist/admin.html'))
})

app.get('/*splat', (req, res) => {
  res.sendFile(path.join(__dirname, './frontend/dist/index.html'))
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))
