const express = require('express')
const mainRouter = express.Router()
const todosRouter = require('./todosRouter')

mainRouter.use('/todos', todosRouter)

module.exports = mainRouter