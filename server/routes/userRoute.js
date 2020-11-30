const router = require ('express').Router()
const UserController = require ('../controllers/userController.js')

router.post ("/register", UserController.register)
router.post ("/login", UserController.login)
router.post ("/googlelogin", UserController.googlelogin)

module.exports = router