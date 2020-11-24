const routes = require('express').Router()
const todoRoute = require('./todo')
const {UserController} = require('../controllers/')

routes.post('/register', UserController.register)
routes.post('/login', UserController.login)
routes.use('/todos', todoRoute)

module.exports = routes