const express = require('express')
const path = require('path')

const products = require('../routes/products')
const orders = require('../routes/orders')
const auth = require('../routes/auth')
const defaultRouter = require('../routes/default')

module.exports = function (app) {
  app.use(express.json())
  app.use(express.static(path.join(__dirname, '../frontend/dist')))

  app.use('/api/products', products)
  app.use('/api/orders', orders)
  app.use('/api/auth', auth)
  app.use('/', defaultRouter)
}
