const router = require('express').Router();
const todoRouter = require('./todo')
const userController = require('../controllers/user')
// const todoController = require('../controllers/todo')

router.use('/todos', todoRouter)

router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/googleLogin', userController.googleLogin)

module.exports = router