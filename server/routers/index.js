const express = require('express')
const mainRouter = express.Router()
const todosRouter = require('./todosRouter')
const registerRouter = require('./register')
const loginRouter = require('./login')
const triviaRouter = require('./3rd-api')
const userController = require('../controllers/userController')

mainRouter.use('/register', registerRouter)
mainRouter.use('/login', loginRouter)
mainRouter.use('/googleLogin', userController.googleLogin)
mainRouter.use('/todos', todosRouter)

//3rd api
mainRouter.use('/trivia', triviaRouter)

module.exports = mainRouter