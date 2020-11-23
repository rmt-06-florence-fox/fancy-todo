const mainRouter = require('express').Router()
const userRouter = require('./user');
const todoRouter = require('./todo')

mainRouter.use('/todos', todoRouter)
mainRouter.use('/', userRouter)

module.exports = mainRouter;