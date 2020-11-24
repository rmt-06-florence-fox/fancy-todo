const express = require('express')
const registerRouter = express.Router()
const userController = require('../controllers/userController')

registerRouter.post('/', userController.register)

module.exports = registerRouter