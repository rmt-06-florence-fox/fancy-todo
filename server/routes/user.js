const router = require('express').Router()
const UserController = require('../controllers/user')

router.post('/signup', UserController.signUp)
router.post('/signin', UserController.signIn)
router.post('/googleSignIn', UserController.gSignIn)

module.exports = router