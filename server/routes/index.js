const router = require("express").Router()
const todo = require("./todo")
const { userController } = require("../controllers")

router.get("/", (req, res) => {
    res.status(200).json({message: "nanti ya page ini belum di handle"})
})

router.post("/login", userController.loginPost)
router.post("/register", userController.registerPost)
router.post("/googleLogin", userController.googleLogin)

router.use("/todos", todo)

module.exports = router