const router = require("express").Router()
const TodoRoute = require("./todoRoute")
const UserController = require("../controllers/UserConstroller")

router.post("/signUp", UserController.signUp)
router.post("/signIn", UserController.signIn)


router.use("/todos", TodoRoute)

module.exports = router