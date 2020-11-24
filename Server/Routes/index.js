const router = require('express').Router()
const todoRouter = require('./todo')
const {UserController} = require('../Controllers/controller')
const {Controller} = require('../Controllers/controller')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/quotes', Controller.getQuotes)
router.get('/restaurants', Controller.getRestaurants)
router.use('/todos', todoRouter)

module.exports = router