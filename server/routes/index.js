const router = require('express').Router()
const todoRoutes = require('./todo')
const { UserController } = require('../controllers')

router.post('/signUp', UserController.signUp)
router.post('/signIn', UserController.signIn)
router.post('/googleLogin', UserController.googleLogin)

router.use('/todos', todoRoutes)

module.exports = router