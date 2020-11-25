const router = require('express').Router()
const todoRouter = require('./todo-router.js')
const userRouter = require('./user-router.js')
const UserController = require('../controllers/user-controller')
const authenticate = require('../middlewares/authentication')


router.get('/', UserController.getRegisterForm)
router.post('/register', UserController.register)

router.get('/login', UserController.getLoginForm)
//using authecitacion middleware
router.post('/login', UserController.login)

router.use(authenticate)
router.use('/todos', todoRouter)
//router.use('/users', userRouter)

module.exports =  router;
