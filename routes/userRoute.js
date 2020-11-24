const router = require('express').Router()
const { UserController } = require('../controller')

router.post('/signUp', UserController.register)
// router.post('/', UserController.Login)


module.exports = router