const express = require('express')
const router = express.Router()
const ControllerUser = require('../controllers/controllerUser')
const todos = require('./todos')



router.get("/",ControllerUser.home)
router.post("/register",ControllerUser.register)
router.post("/login",ControllerUser.login)
router.use("/todos",todos)

module.exports = router