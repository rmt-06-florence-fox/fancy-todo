const router = require('express').Router()
const todoRouter = require('./todo-router.js')
const userRouter = require('./user-router.js')
const UserController = require('../controllers/user-controller')

router.get('/', (req, res) => {
    res.status(200).json({msg : 'ini home'})
})

router.get('/register', UserController.getRegisterForm)
//router.post('/register', UserController.register)

//router.get('/login', UserController.getLoginForm)
//router.post('/login', UserController.login)

router.use('/todos', todoRouter)
router.use('/users', userRouter)

module.exports =  router;
