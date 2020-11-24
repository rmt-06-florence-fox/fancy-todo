const router = require('express').Router()
const { UserController } = require('../controller')

router.post('/register', UserController.register)
router.post('/login', UserController.login)


module.exports = router