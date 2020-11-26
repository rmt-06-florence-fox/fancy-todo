const route = require('express').Router()
const todoRoute = require('./todoRoute')
const Controller = require('../controllers/controllers')

route.post('/register', Controller.register)    
route.post('/login', Controller.login)  

route.use('/todos', todoRoute)

module.exports = route