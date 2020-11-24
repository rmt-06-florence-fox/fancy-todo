const express = require('express')
const UserController = require('../controllers/userController')
const userRoute = express.Router()

userRoute.post('/signup', UserController.signup)
userRoute.post('/signin', UserController.signin)

module.exports = userRoute