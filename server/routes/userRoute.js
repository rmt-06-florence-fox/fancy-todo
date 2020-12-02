const route = require('express').Router()
const { UserController } = require('../controllers/controller')


route.post('/register',UserController.postRegister)
route.post('/login',UserController.postLogin)
route.post('/googleLogin',UserController.postGoogleLogin)

module.exports = route