const routes = require('express').Router()
const todoRoute = require('./todo')

routes.use('/todos', todoRoute)

module.exports = routes