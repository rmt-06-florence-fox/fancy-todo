const mainRouter = require('express').Router()
const todoRouter = require('./todo')

mainRouter.use('/todos', todoRouter)

module.exports = mainRouter;