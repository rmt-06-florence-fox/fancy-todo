const express = require('express')
const mainRouter = express.Router()
const todosRouter = require('./todosRouter')
const registerRouter = require('./register')
const loginRouter = require('./login')

mainRouter.use('/todos', todosRouter)
mainRouter.use('/register', registerRouter)
mainRouter.use('/login', loginRouter)

module.exports = mainRouter