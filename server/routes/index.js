const router = require('express').Router()
const todosRoutes = require('./todos')
const { UserController } = require('../controllers/index')
const authentication = require('../middlewares/authentication')


router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/googlelogin', UserController.googlelogin)
router.use(authentication)
router.use('/todos', todosRoutes)



module.exports = router