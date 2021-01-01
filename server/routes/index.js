const express = require("express")
const router = express.Router()
const todoRouter = require("./todo.js")
const UserController = require("../controllers/user")
const apiController = require("../controllers/apis")



router.post("/register", UserController.register)
router.post("/login", UserController.login)
router.post("/googleLogin", UserController.googleLogin)
router.use("/todos", todoRouter)
router.get("/quotes", apiController.favqs)

module.exports = router