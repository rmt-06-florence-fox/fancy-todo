const route = require('express').Router()
const todoRoute = require('./todoRoute')
const Controller = require('../controllers/controllers')

route.use('/todos', todoRoute)

route.post('/register', Controller.register)
route.post('/login', Controller.login)
module.exports = route