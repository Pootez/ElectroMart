const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')
const db = require('../db')

router.post('/checkout', auth, async (req, res) => {
  const { items, address, method } = req.body

  if (!items?.length || !address || !method)
    return res.status(400).send('Missing items, address, or payment method')

  try {
    // Step 1: Fetch product info
    const itemIds = items.map((item) => item.id)
    const productResult = await db.query(
      `SELECT id, price FROM product WHERE id = ANY($1::int[])`,
      [itemIds]
    )

    const priceMap = Object.fromEntries(
      productResult.rows.map((product) => [product.id, Number(product.price)])
    )

    // Step 2: Calculate subtotals and total
    const orderItems = items.map((item) => {
      const price = priceMap[item.id]
      const quantity = item.count
      const subtotal = price * quantity
      return { productID: item.id, quantity, subtotal }
    })

    const deliveryFee = 30
    const totalAmount =
      orderItems.reduce((sum, item) => sum + item.subtotal, 0) + deliveryFee

    // Step 3: Create the order
    const orderResult = await db.query(
      `INSERT INTO orders (userID, totalAmount, orderDate, address, status)
       VALUES ($1, $2, NOW(), $3, 'pending')
       RETURNING id`,
      [req.user.userID, totalAmount, address]
    )

    const orderId = orderResult.rows[0].id

    // Step 4: Insert order items
    for (const item of orderItems) {
      await db.query(
        `INSERT INTO orderItem (orderID, productID, quantity, subtotal)
         VALUES ($1, $2, $3, $4)`,
        [orderId, item.productID, item.quantity, item.subtotal]
      )
    }

    // Step 5: Insert payment (status pending for now)
    await db.query(
      `INSERT INTO payment (orderID, method, amount, paymentDate, status)
       VALUES ($1, $2, $3, NOW(), 'pending')`,
      [orderId, method, totalAmount]
    )

    res.send({ orderId })
  } catch (err) {
    console.error(err)
    res.status(500).send('Order failed')
  }
})

router.get('/ID/:orderID', auth, async (req, res) => {
  const orderID = req.params.orderID

  try {
    // Step 1: Fetch order and validate user is owner
    const orderResult = await db.query(
      `SELECT id, userID, totalAmount, orderDate, address, status
       FROM orders
       WHERE id = $1`,
      [orderID]
    )

    const order = orderResult.rows[0]
    if (!order) return res.status(404).send('Order not found')
    if (order.userid !== req.user.userID)
      return res.status(403).send('Access denied')

    // Step 2: Fetch order items
    const itemsResult = await db.query(
      `SELECT productID AS id, quantity AS count
       FROM orderItem
       WHERE orderID = $1`,
      [orderID]
    )

    const response = {
      id: order.id,
      total: Number(order.totalamount),
      orderDate: order.orderdate.toISOString(),
      address: order.address,
      status: order.status,
      items: itemsResult.rows,
    }

    res.json(response)
  } catch (err) {
    console.error(err)
    res.status(500).send('Failed to fetch order')
  }
})

module.exports = router
