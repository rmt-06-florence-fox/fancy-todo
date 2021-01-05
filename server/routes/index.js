const router = require('express').Router()
const UserController = require('../controllers/userController.js')
const todoRouter = require('./todoRouter.js')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
// router.post('/googleLogin', UserController.googleLogin)
router.use('/todos', todoRouter)

module.exports = router