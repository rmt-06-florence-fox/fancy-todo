const router = require('express').Router()
const todoRouter = require('./todoRouter.js')
const { Controller, UserController } = require('../controllers/controller.js')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.use('/todos', todoRouter)

module.exports = router