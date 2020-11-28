const express = require("express")
const route = express.Router()
const ControllerApi = require("../controllers/apiController")
const ControllerUser = require("../controllers/userController")
const ControllerTodo = require("../controllers/todoController")
const authentication = require("../middleware/authentication")
const authorization = require("../middleware/authorization")


route.post("/register", ControllerUser.addDataUser)
route.post("/login", ControllerUser.loginUser)
route.post("/googlelogin", ControllerUser.loginWithGoogle)
route.get("/api", ControllerApi.showApi)


route.use(authentication)
route.get("/", ControllerTodo.showAllDataTodos)
route.post("/", ControllerTodo.addDataTodos)

route.get("/:id", authorization, ControllerTodo.showDataTodosById)
route.put("/:id", authorization, ControllerTodo.replaceDataTodosById)
route.patch("/:id", authorization, ControllerTodo.modifyDataTodosById)
route.delete("/:id", authorization, ControllerTodo.destroyDataTodosById)

module.exports = route