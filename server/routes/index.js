const express = require("express")
const router = express.Router()
const todoRouter = require("./todo.js")
const UserController = require("../controllers/user")

router.use("/todos", todoRouter)
router.post("/register", UserController.register)
router.post("/login", UserController.login)

module.exports = router