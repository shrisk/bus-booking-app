const express = require('express')
const router = express.Router()

require('./routes/register')(router)
require('./routes/bus')(router)
module.exports = router