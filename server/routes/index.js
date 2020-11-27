const router = require('express').Router()
const todoRouter = require('./todo')
const UserController = require('../controllers/user')
const authentication = require('../middlewares/authentication')
const weatherRouter = require('./weather')

router.get('/', (req, res) => {res.send('Welcome to server fancy todo')})

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.use(authentication)
router.use('/todos', todoRouter)
router.use('/weathers', weatherRouter)

module.exports = router