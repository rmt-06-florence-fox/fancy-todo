const routes = require('express').Router()
const todoRoute = require('./todo')
const {UserController, ApiController} = require('../controllers/index')
const authentication = require('../middlewares/authentication')

routes.post('/register', UserController.register)
routes.post('/login', UserController.login)
routes.post('/googleLogin', UserController.googleLogin)

// ! authentication first
routes.use(authentication)
routes.use('/todos', todoRoute)
routes.get('/weathers', ApiController.weatherToday)

module.exports = routes