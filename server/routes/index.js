const express = require('express')
const Controller = require('../controllers')
const route = express.Router()
const todoRoute = require('./todo')
const userRoute = require('./user')
const thirdPartyRoute = require('./3rdparty')

route.get('/', Controller.home)
route.use('/todos', todoRoute)
route.use('/users', userRoute)
route.use(thirdPartyRoute)

module.exports = route