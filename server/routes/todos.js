const express = require('express')
const router = express.Router()
const ControllerTodo = require('../controllers/controllerTodo')
const authentication = require('../middleware/authentication')


router.get("/", authentication,ControllerTodo.listTodo)
router.post("/", authentication,ControllerTodo.createTodo)
router.get("/:id", ControllerTodo.findTodoById)
router.delete("/:id", ControllerTodo.deleteTodo)
router.put("/:id", ControllerTodo.updateTodo)
router.patch("/:id", ControllerTodo.updateStatusTodo)


module.exports = router