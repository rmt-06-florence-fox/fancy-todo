const router = require('express').Router()
const todoRouter = require('./todoRouter.js')
const UserController = require('../controllers/userController.js')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.use('/todos', todoRouter)

module.exports = router