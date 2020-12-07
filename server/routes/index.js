const mainRouter = require('express').Router()
const userRouter = require('./user');
const todoRouter = require('./todo')
const sholluRouter = require('./shollu');

mainRouter.use('/shollu', sholluRouter)
mainRouter.use('/todos', todoRouter)
mainRouter.use('/', userRouter)

module.exports = mainRouter;