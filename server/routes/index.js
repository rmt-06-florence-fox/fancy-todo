const mainRouter = require('express').Router()
const userRouter = require('./user');
const todoRouter = require('./todo')
const sholluRouter = require('./shollu');

mainRouter.use('/todos', todoRouter)
mainRouter.use('/shollu', sholluRouter)
mainRouter.use('/', userRouter)

module.exports = mainRouter;