const route = require('express').Router()
const { UserController } = require('../controllers/controller')


route.post('/register',UserController.postRegister)


module.exports = route