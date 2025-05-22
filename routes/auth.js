const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')
const jwt = require('jsonwebtoken')
const config = require('config')
const bcrypt = require('bcrypt')
const db = require('../db')

router.get('/me', auth, async (req, res) => {
  try {
    const userResult = await db.query(
      `SELECT email, firstName, lastName, phoneNumber
       FROM users
       WHERE userID = $1`,
      [req.user.userID]
    )

    const user = userResult.rows[0]
    if (!user) return res.status(404).send('User not found')

    const orderResult = await db.query(
      `SELECT id FROM orders WHERE userID = $1`,
      [req.user.userID]
    )

    const orders = orderResult.rows.map((row) => row.id.toString())

    res.json({ userDetails: { ...user, orders } })
  } catch (err) {
    console.error(err)
    res.status(500).send('Failed to fetch user details')
  }
})

router.post('/register', async (req, res) => {
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
        timestamp: Date.now(),
      },
      config.get('jwtPrivateKey')
    )
    res.send({ token })
  } catch (err) {
    console.error(err)
    res.status(500).send('Internal server error')
  }
})

router.post('/login', async (req, res) => {
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
        timestamp: Date.now()
      },
      config.get('jwtPrivateKey')
    )

    res.send({ token })
  } catch (err) {
    console.error(err)
    res.status(500).send('Internal server error')
  }
})

module.exports = router
