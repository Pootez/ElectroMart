const express = require('express')
const app = express()

require('./startup/config.js')()
require('./startup/initDB.js').checkAndInitDB()
require('./startup/initDB.js').createAdmin()
require('./startup/routes.js')(app)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))
