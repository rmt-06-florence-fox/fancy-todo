const TodoRouter = require('./todo')
const MainRouter = require('express').Router();
const Authentication = require('../middlewares/authentication')
const { UserController } = require('../controllers')

MainRouter.post('/register', UserController.register)
MainRouter.post('/login', UserController.login)
MainRouter.use(Authentication)
MainRouter.use('/todos', TodoRouter)

module.exports = MainRouter