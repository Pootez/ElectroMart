const express = require('express')
const router = express.Router()

const db = require('../db')
const { productSelectionSQL, mapProductRow} = require('../utils/productUtils')

router.get('/ID/:productId', async (req, res) => {
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

router.get('/all', async (req, res) => {
  try {
    const result = await db.query(productSelectionSQL)
    res.send(result.rows.map(mapProductRow))
  } catch (err) {
    console.error(err)
    res.status(500).send('Failed to fetch products')
  }
})

router.get('/search', async (req, res) => {
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

module.exports = router