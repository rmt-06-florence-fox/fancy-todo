const TodoRouter = require('./todo')
const MainRouter = require('express').Router();

const {UserController} = require('../controllers')

MainRouter.use('/todos', TodoRouter)
MainRouter.post('/register', UserController.register)
MainRouter.post('/login', UserController.login)

module.exports = MainRouter