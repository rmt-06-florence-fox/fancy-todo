const router = require("express").Router()
const TodoRoute = require("./todoRoute")
const UserController = require("../controllers/UserConstroller")

router.post("/signUp", UserController.signUp)
router.post("/signIn", UserController.signIn)
router.post("/googleSignIn", UserController.goolgleSignIn)

router.use("/todos", TodoRoute)

module.exports = router