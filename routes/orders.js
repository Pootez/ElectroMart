const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')
const db = require('../db')

router.post('/checkout', auth, async (req, res) => {
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

module.exports = router