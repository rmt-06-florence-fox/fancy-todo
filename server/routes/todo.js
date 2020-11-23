const express = require("express")
const router = express.Router()
const TodosController = require("../controllers/todo.js")

router.get("/", TodosController.showTodos)
router.post("/", TodosController.createTodo)
router.get("/:id", TodosController.getTodoById)
router.put("/:id", TodosController.replaceTodo)
router.patch("/:id", TodosController.editStatus)
router.delete("/:id", TodosController.deleteTodo)

module.exports = router