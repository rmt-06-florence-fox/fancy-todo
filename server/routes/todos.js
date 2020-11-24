const express = require('express')
const router = express.Router()
const ControllerTodo = require('../controllers/controllerTodo')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')

router.use(authentication)
router.get("/",ControllerTodo.listTodo)
router.post("/",ControllerTodo.createTodo)
router.get("/:id",ControllerTodo.findTodoById)
router.delete("/:id", authorization,ControllerTodo.deleteTodo)
router.put("/:id", authorization,ControllerTodo.updateTodo)
router.patch("/:id", authorization,ControllerTodo.updateStatusTodo)


module.exports = router