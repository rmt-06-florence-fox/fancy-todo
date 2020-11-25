const express = require("express")
const route = express.Router()
const todoRoutes = require("./todoRoutes")
const userRoutes = require("./userRoute")
const ControllerApi = require("../controllers/apiController")

route.get("/api", ControllerApi.showApi)
route.use("/todos", todoRoutes)
route.use("/users", userRoutes)

module.exports = route