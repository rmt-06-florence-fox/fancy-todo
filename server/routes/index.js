const route = require("express").Router()
const todoRoute = require("./TodoRouter")
const UserController = require("../controllers/userControllers")


route.use('/todos', todoRoute)
route.post('/register', UserController.register)
route.post('/login', UserController.login)

module.exports = route