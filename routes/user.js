const router = require("express").Router()
const { userController } = require("../controllers")

router.post("/register", userController.registerPost)
router.post("/login", userController.loginPost)

module.exports = router