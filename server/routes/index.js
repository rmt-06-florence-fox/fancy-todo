const TodoRouter = require('./todo')
const MainRouter = require('express').Router();

MainRouter.use('/todos', TodoRouter)


module.exports = MainRouter