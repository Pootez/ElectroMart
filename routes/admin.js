const express = require('express')
const router = express.Router()
const db = require('../db')
const adminOnly = require('../middleware/adminOnly')

router.use(adminOnly)

//
// === PRODUCT ===
//
router.post('/products', async (req, res) => {
  const { name, description, price, stockquantity, brandid, categoryid } =
    req.body
  try {
    const result = await db.query(
      `INSERT INTO product (name, description, price, stockquantity, brandid, categoryid)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [name, description, price, stockquantity, brandid, categoryid]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).send('Failed to create product')
  }
})

router.put('/products/:id', async (req, res) => {
  const { name, description, price, stockquantity, brandid, categoryid } =
    req.body
  try {
    const result = await db.query(
      `UPDATE product SET name = $1, description = $2, price = $3, stockquantity = $4, brandid = $5, categoryid = $6
       WHERE id = $7 RETURNING *`,
      [
        name,
        description,
        price,
        stockquantity,
        brandid,
        categoryid,
        req.params.id,
      ]
    )
    res.json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).send('Failed to update product')
  }
})

router.delete('/products/:id', async (req, res) => {
  try {
    await db.query(`DELETE FROM product WHERE id = $1`, [req.params.id])
    res.sendStatus(204)
  } catch (err) {
    console.error(err)
    res.status(500).send('Failed to delete product')
  }
})

//
// === BRAND ===
//
router.post('/brands', async (req, res) => {
  const { name, description } = req.body
  try {
    const result = await db.query(
      `INSERT INTO brand (name, description) VALUES ($1, $2) RETURNING *`,
      [name, description]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).send('Failed to create brand')
  }
})

router.delete('/brands/:id', async (req, res) => {
  try {
    await db.query(`DELETE FROM brand WHERE id = $1`, [req.params.id])
    res.sendStatus(204)
  } catch (err) {
    console.error(err)
    res.status(500).send('Failed to delete brand')
  }
})

//
// === CATEGORY ===
//
router.post('/categories', async (req, res) => {
  const { name, description } = req.body
  try {
    const result = await db.query(
      `INSERT INTO category (name, description) VALUES ($1, $2) RETURNING *`,
      [name, description]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).send('Failed to create category')
  }
})

router.delete('/categories/:id', async (req, res) => {
  try {
    await db.query(`DELETE FROM category WHERE id = $1`, [req.params.id])
    res.sendStatus(204)
  } catch (err) {
    console.error(err)
    res.status(500).send('Failed to delete category')
  }
})

//
// === USERS ===
//
// Get all users
router.get('/users', async (req, res) => {
  try {
    const result = await db.query(
      `SELECT userID, email, firstName, lastName, phoneNumber, isAdmin FROM users`
    )
    res.json(result.rows)
  } catch (err) {
    console.error(err)
    res.status(500).send('Failed to fetch users')
  }
})

// Update user (e.g., promote/demote admin, update info)
router.put('/users/:id', async (req, res) => {
  const { email, firstName, lastName, phoneNumber, isAdmin } = req.body
  try {
    const result = await db.query(
      `UPDATE users
       SET email = $1, firstName = $2, lastName = $3, phoneNumber = $4, isAdmin = $5
       WHERE userID = $6 RETURNING *`,
      [email, firstName, lastName, phoneNumber, isAdmin, req.params.id]
    )
    res.json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).send('Failed to update user')
  }
})

// Delete user
router.delete('/users/:id', async (req, res) => {
  try {
    await db.query(`DELETE FROM users WHERE userID = $1`, [req.params.id])
    res.sendStatus(204)
  } catch (err) {
    console.error(err)
    res.status(500).send('Failed to delete user')
  }
})

//
// === ORDERS ===
//
// Get all orders
router.get('/orders', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT o.id, o.userID, o.totalAmount, o.orderDate, o.address, o.status,
             u.email, u.firstName, u.lastName
      FROM orders o
      JOIN users u ON o.userID = u.userID
      ORDER BY o.orderDate DESC
    `)
    res.json(result.rows)
  } catch (err) {
    console.error(err)
    res.status(500).send('Failed to fetch orders')
  }
})

// Update order status
router.put('/orders/:id', async (req, res) => {
  const { status } = req.body
  try {
    const result = await db.query(
      `UPDATE orders SET status = $1 WHERE id = $2 RETURNING *`,
      [status, req.params.id]
    )
    res.json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).send('Failed to update order')
  }
})

// Delete order (and related orderItems + payment)
router.delete('/orders/:id', async (req, res) => {
  const orderId = req.params.id
  try {
    await db.query(`DELETE FROM payment WHERE orderID = $1`, [orderId])
    await db.query(`DELETE FROM orderItem WHERE orderID = $1`, [orderId])
    await db.query(`DELETE FROM orders WHERE id = $1`, [orderId])
    res.sendStatus(204)
  } catch (err) {
    console.error(err)
    res.status(500).send('Failed to delete order')
  }
})

module.exports = router
