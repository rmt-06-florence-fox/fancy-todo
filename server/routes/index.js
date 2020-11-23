const router = require('express').Router()
const Controller = require('../controller/controller')
const todo = require('./todo')

router.use('/todos', todo)

module.exports = router