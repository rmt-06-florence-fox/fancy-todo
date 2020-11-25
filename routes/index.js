const route = require('express').Router()
const todoRoute = require('./todoRoute.js')
const userRoute = require('./userRoute.js')
const apiRoute = require('./apiRoutes.js')

route.use('/todos', todoRoute)
route.use('/', userRoute)
route.use('/', apiRoute)




module.exports = route