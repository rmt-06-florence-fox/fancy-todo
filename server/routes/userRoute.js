const express = require("express")
const route = express.Router()
const ControllerUser = require("../controllers/userController")

route.post("/register", ControllerUser.addDataUser)
route.post("/login", ControllerUser.loginUser)

module.exports = route