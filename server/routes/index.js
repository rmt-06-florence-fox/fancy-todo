const router = require('express').Router()
const todoRouter = require('./todo')
const {UserController} = require('../controller')
const {TodoController} = require('../controller')
const authentication = require('../middleware/authentication')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/googleLogin', UserController.googleLogin)
router.use(authentication)
router.use('/todos', todoRouter)
router.get('/news', TodoController.news)
router.get('/weather', TodoController.weather)

module.exports = router