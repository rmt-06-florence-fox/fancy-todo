const router = require('express').Router()
const todo = require('./todo')

router.use('/todos', todo)

module.exports = router