const router = require('express').Router()
const { UserController } = require('../controllers')

router.post('/signUp', UserController.signUp)
router.post('/signIn', UserController.signIn)

module.exports = router