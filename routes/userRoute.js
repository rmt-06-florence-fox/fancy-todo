const route = require('express').Router()
const {UserController} = require('../controller/index.js')





route.post('/signUp', UserController.registerUser)

route.post('/signIn', UserController.signInUser)


module.exports = route