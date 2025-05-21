const express = require('express')
const router = express.Router()
const path = require('path')

router.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/admin.html'))
})

router.get('/*splat', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'))
})

module.exports = router