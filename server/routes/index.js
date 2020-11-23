const router = require('express').Router()
const todosRouter = require('./todos-router')

router.use('/todos', todosRouter)

module.exports = router