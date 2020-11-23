const express = require("express")
const router = express.Router()
const todoRouter = require("./todo.js")

router.use("/todos", todoRouter)

module.exports = router