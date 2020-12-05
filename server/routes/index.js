const router = require('express').Router()
const todosRoute = require('./todosRoute')
const userRoute = require('./userRoute')

router.use('/todos', todosRoute)
router.use('/', userRoute)

module.exports = router

