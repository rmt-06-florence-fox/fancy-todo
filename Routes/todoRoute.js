const router = require("express").Router()
const TodoController = require("../controllers/TodoController")

router.post("/", TodoController.postTodo)
router.get("/", TodoController.getAllTodo)
router.get("/:id", TodoController.getTodoById)
router.put("/:id", TodoController.updateTodoById)
router.patch("/:id", TodoController.updateSpesificTodoById)
router.delete("/:id", TodoController.deleteTodoById)

module.exports = router