const router = require("express").Router()
const UserController = require("../controllers/UserConstroller")

router.post("/signUp", UserController.signUp)

module.exports = router