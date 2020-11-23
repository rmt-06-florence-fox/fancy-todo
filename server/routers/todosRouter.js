const express = require('express')
const todosRouter = express.Router()
const todoController = require('../controllers/todosController')

todosRouter.get("/", todoController.getTodo)
todosRouter.post("/", todoController.createTodo)
todosRouter.get("/:id", todoController.findTodo)
todosRouter.put("/:id", todoController.replaceTodo)
todosRouter.patch("/:id", todoController.modifyTodo)
todosRouter.delete("/:id", todoController.deleteTodo)

module.exports = todosRouter