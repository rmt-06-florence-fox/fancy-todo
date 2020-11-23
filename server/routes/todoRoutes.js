const express = require("express")
const route = express.Router()
const ControllerTodo = require("../controllers/todoController")

route.get("/", ControllerTodo.showAllDataTodos)
route.post("/", ControllerTodo.addDataTodos)
route.get("/:id", ControllerTodo.showDataTodosById)
route.put("/:id", ControllerTodo.replaceDataTodosById)
route.patch("/:id", ControllerTodo.modifyDataTodosById)
route.delete("/:id", ControllerTodo.destroyDataTodosById)

module.exports = route