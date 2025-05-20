const path = require('path')
const fs = require('fs')
const db = require('./db')

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

module.exports = { initDB, checkAndInitDB }
