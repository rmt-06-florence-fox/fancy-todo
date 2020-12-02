const route = require('express').Router()
const userRoute = require('./userRoute')
const todoRoute = require('./todoRoute')

route.use('/',userRoute)
route.use('/todos',todoRoute)


module.exports = route