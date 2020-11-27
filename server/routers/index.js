const express = require('express')
const router = express.Router()

const routeTodos = require('./todos')
const routeUsers = require('./users')

router.use('/todos', routeTodos)
router.use('/', routeUsers)

module.exports = router