const route = require('express').Router()
const todoRoute = require('./todoRoute')
const Controller = require('../controllers/controllers')

route.post('/register', Controller.register)    
route.post('/login', Controller.login)
route.post('/googleLogin', Controller.googleLogin)
route.get('/quote', Controller.getQuote)
route.get('/jokes', Controller.getJokes)

route.use('/todos', todoRoute)

module.exports = route