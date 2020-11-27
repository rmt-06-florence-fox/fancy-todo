const route = require('express').Router()
const todoRoute = require('./todoRoute.js')
const userRoute = require('./userRoute.js')
const apiRoute = require('./apiRoutes.js')
const projectRoute = require('./projectRoutes')

route.use('/todos', todoRoute)
route.use('/', userRoute)
route.use('/', apiRoute)
route.use('/projects',projectRoute)




module.exports = route