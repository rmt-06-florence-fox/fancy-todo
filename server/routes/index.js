const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')
const todos = require('./todos')



router.get("/",Controller.home)
router.post("/register",Controller.register)
router.post("/login",Controller.login)
router.use("/todos",todos)

module.exports = router