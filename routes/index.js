const routes = require('express').Router()
const todosRoute = require('./todosRoute')
const userRoute = require('./userRoute')

routes.use('/todos', todosRoute)
routes.use('/users', userRoute)

module.exports = routes

