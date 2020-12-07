const router = require('express').Router()
const { UserController } = require('../controllers')

router.post('/signUp', UserController.signUpUser)
router.post('/signIn', UserController.signInUser)
router.post('/googleSignIn', UserController.googleSignIn)

module.exports = router