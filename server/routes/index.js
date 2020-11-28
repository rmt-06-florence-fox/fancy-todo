const router = require('express').Router()
const todoRouter = require('./todo-router.js')
//const userRouter = require('./user-router.js')
const UserController = require('../controllers/user-controller')
const authenticate = require('../middlewares/authentication')
const QuoteController = require('../controllers/quote-controller.js')

router.post('/register', UserController.register)

//using authecitacion middleware
router.post('/login', UserController.login)
router.post('/google', UserController.googleSignIn)

router.use(authenticate)
router.use('/todos', todoRouter)
router.use('/quote', QuoteController.getRandomQuote)

module.exports =  router;
