const express = require('express')
const UserController = require('../controllers/userController')
const userRoute = express.Router()

userRoute.post('/signup', UserController.signup)
userRoute.post('/signin', UserController.signin)
userRoute.post('/signinbygoogle', UserController.google)

module.exports = userRoute