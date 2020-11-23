const router = require("express").Router();
const TodoController = require("../controllers/todo-controller");

router.post("/", TodoController.postTodo);
router.get("/", TodoController.getTodo);
router.get("/:id", TodoController.getTodoId);
router.put("/:id", TodoController.putTodoId);
router.patch("/:id", TodoController.patchTodoId);
router.delete("/:id", TodoController.deleteTodoId);

module.exports = router;
