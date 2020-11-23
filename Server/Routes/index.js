const router = require('express').Router()
const todoRouter = require('./todo')
const {UserController} = require('../Controllers/controller')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.use('/todos', todoRouter)

module.exports = router