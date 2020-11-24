const route = require('express').Router()
const todoRoute = require('./todoRoute')
const Controller = require('../controllers/controllers')
const authentication = require('../middleware/authentication')


route.post('/register', Controller.register)
route.post('/login', Controller.login)

route.use(authentication)
route.use('/todos', todoRoute)

module.exports = route