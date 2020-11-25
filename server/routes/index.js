const express = require('express')
const Controller = require('../controllers')
const route = express.Router()
const todoRoute = require('./todo')
const userRoute = require('./user')

route.get('/', Controller.home)
route.use('/todos', todoRoute)
route.use('/users', userRoute)

module.exports = route