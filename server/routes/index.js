const TodoRouter = require('./todo')
const MainRouter = require('express').Router();
const Authentication = require('../middlewares/authentication')
const {UserController} = require('../controllers')

MainRouter.use('/todos', Authentication, TodoRouter)
MainRouter.post('/register', UserController.register)
MainRouter.post('/login', UserController.login)

module.exports = MainRouter