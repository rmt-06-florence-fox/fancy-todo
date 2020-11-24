const route = require('express').Router()
const todoRoute = require('./todoRoute.js')
const userRoute = require('./userRoute.js')


route.use('/todos', todoRoute)
route.use('/', userRoute)



module.exports = route