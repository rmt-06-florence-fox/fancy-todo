const router = require('express').Router()
const UserController  = require('../controllers/user-controller')

router.post('/', UserController.logIn)
router.post('/google', UserController.googleLogIn)

module.exports = router