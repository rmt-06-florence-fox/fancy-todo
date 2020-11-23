const express = require('express')
const Controller = require('../controllers')
const route = express.Router()
const todoRoute = require('./todo')

route.get('/', Controller.home)
route.use('/todos', todoRoute)

module.exports = route