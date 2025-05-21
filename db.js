const { Pool } = require('pg')
const config = require('config')

const pool = new Pool({
  connectionString: config.get('databaseUrl'),
  ssl: false, // Required for Render PostgreSQL
})

module.exports = pool