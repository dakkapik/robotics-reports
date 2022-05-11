const express = require('express')
const app = express()

require('dotenv').config()
require('./setup/db')
require('./setup/router')(app)

const port = process.env.PORT || 5000

app.listen(port , ()=> console.log('> Server is up and running on port : ' + require("./util/address")))

