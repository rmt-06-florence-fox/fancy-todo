const express = require("express")
const route = express.Router()
const ControllerTodo = require("../controllers/todoController")
const authentication = require("../middleware/authentication")
const authorization = require("../middleware/authorization")

route.use(authentication)
route.get("/", ControllerTodo.showAllDataTodos)
route.post("/", ControllerTodo.addDataTodos)

route.get("/:id", authorization, ControllerTodo.showDataTodosById)
route.put("/:id", authorization, ControllerTodo.replaceDataTodosById)
route.patch("/:id", authorization, ControllerTodo.modifyDataTodosById)
route.delete("/:id", authorization, ControllerTodo.destroyDataTodosById)

module.exports = route