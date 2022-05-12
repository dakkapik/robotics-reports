const express = require('express')
const app = express()
const EndpointSpamProtector = require('express-endpoint-spam-protector');

const config = {
      minuteInterval: 15, // default value is 15
      requestAmountBeforeBan: 50, // default value is 50
      rejectionCode: 401 // default value is 401
};
const protector = new EndpointSpamProtector(config);

app.use(protector.protect);

require('dotenv').config()
require('./setup/db')
require('./setup/router')(app)

console.log(require("./util/address"))

const port = process.env.PORT || 5000

app.listen(port , ()=> console.log('> Server is up and running on port : ' + require("./util/address")))

