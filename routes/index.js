const route = require('express').Router()
const todoRoute = require('./todoRoute.js')



route.use('/todos', todoRoute)



module.exports = route