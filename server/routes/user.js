const router = require("express").Router()
const UserController = require("../controller/userController")

router.post('/sign-in', UserController.signIn)
router.post('/sign-up', UserController.signUp)
router.post('/googleSignIn', UserController.googleSignIn)

module.exports = router