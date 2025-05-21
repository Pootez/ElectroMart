const express = require('express')
const router = express.Router()
const path = require('path')

const distPath = path.join(__dirname, '../frontend/dist')

router.get('admin', (req, res) => {
  res.sendFile('admin.html', { root: distPath })
})

router.get('*splat', (req, res) => {
  res.sendFile('index.html', { root: distPath })
})

module.exports = router