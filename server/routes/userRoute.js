const router = require('express').Router()
const { UserController } = require('../controller')
const authentication = require('../middleware/Authentification')

router.post('/register',  UserController.register)
router.post('/login', UserController.login)

// router.post('/register',  UserController.register)
// router.post('/login', UserController.login)

module.exports = router