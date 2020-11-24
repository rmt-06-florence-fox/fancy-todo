const router = require('express').Router();
const todoRouter = require('./todo')
const userController = require('../controllers/user')

router.use('/todos', todoRouter)

router.post('/register', userController.register)
router.post('/login', userController.login)

module.exports = router