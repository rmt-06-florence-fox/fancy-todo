const route = require('express').Router()
const userRoute = require('./userRoute')
const todoRoute = require('./todoRoute')

route.use('/todos',todoRoute)
route.use('/users',userRoute)


module.exports = route