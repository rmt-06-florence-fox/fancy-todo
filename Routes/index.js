const router = require("express").Router()
const todoRoute = require("./todoRoute")

router.use("/todos", todoRoute)

module.exports = router