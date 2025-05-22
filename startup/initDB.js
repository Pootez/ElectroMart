const path = require('path')
const fs = require('fs')
const config = require('config')
const bcrypt = require('bcrypt')
const db = require('../db')

const initDB = async () => {
  const filePath = '../sql/electromart_pg.sql'
  const fullPath = path.join(__dirname, filePath)
  const sql = fs.readFileSync(fullPath, 'utf8')

  try {
    await db.query(sql)
    console.log(`Ran ${filePath} successfully.`)
  } catch (err) {
    console.error(`Error running ${filePath}:`, err)
  }
}

const checkAndInitDB = async () => {
  const res = await db.query(
    "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'users');"
  )
  if (!res.rows[0].exists) {
    console.log('Users table not found, initializing schema.')
    initDB()
  } else {
    console.log('Users table already exists, skipping init.')
  }
}

const createAdmin = async () => {
  const { email, firstName, lastName, phoneNumber, isAdmin, password } =
    config.get('adminUser')

  if (!password) {
    return console.log('ADMIN_PASSWORD is not set. Not creating admin user')
  }
  console.log(
    'ADMIN_PASSWORD is set. Ensuring admin user "' + email + '" exists.'
  )

  const existing = await db.query('SELECT * FROM users WHERE email = $1', [
    email,
  ])
  if (existing.rows.length) return

  const hashed = await bcrypt.hash(password, 10)

  await db.query(
    `INSERT INTO users (email, password, firstName, lastName, phoneNumber, isAdmin)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [email, hashed, firstName, lastName, phoneNumber, isAdmin]
  )

  console.log('Admin user created.')
}

module.exports = { initDB, checkAndInitDB, createAdmin }
