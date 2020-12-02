const express = require('express')
const todosRouter = express.Router()
const todoController = require('../controllers/todosController')
const authentication = require('../midlleware/authentication')
const authorization = require('../midlleware/authorization')

todosRouter.use(authentication)
todosRouter.get("/", todoController.getTodo)
todosRouter.post("/", todoController.createTodo)

// todosRouter.use(authorization)
todosRouter.get("/:id", authorization, todoController.findTodo)
todosRouter.put("/:id", authorization, todoController.replaceTodo)
todosRouter.patch("/:id", authorization, todoController.modifyTodo)
todosRouter.delete("/:id", authorization, todoController.deleteTodo)

module.exports = todosRouter