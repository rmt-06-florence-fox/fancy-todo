const express = require("express")
const route = express.Router()
const todoRoutes = require("./todoRoutes")
const userRoutes = require("./userRoute")

route.use("/todos", todoRoutes)
route.use("/users", userRoutes)

module.exports = route