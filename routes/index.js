const router = require('express').Router()
const todosRoute = require('./todosRoute')
const userRoute = require('./userRoute')

// const { UserController } = require('../controller')


// router.post('/SignUp', UserController.SignUp)

// router.post('/Login', userController.Login)




router.use('/todos', todosRoute)
router.use('/users', userRoute)

module.exports = router

