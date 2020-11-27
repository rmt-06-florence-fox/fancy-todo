const express = require('express')
const router = express.Router()

const routeTodos = require('./todos')
const routeUsers = require('./users')
const routeThirdParty = require('./3rdPartyApi')

router.use('/todos', routeTodos)
router.use('/', routeUsers)
router.use('/quotes', routeThirdParty)

module.exports = router