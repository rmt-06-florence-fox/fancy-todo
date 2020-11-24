const routes = require('express').Router()
const todoRoute = require('./todo')
const {UserController} = require('../controllers/')
const authentication = require('../middlewares/authentication')

routes.post('/register', UserController.register)
routes.post('/login', UserController.login)

// ! authentication first
routes.use(authentication)
routes.use('/todos', todoRoute)

module.exports = routes