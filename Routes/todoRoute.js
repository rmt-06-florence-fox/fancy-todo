const router = require("express").Router()
const TodoController = require("../controllers/TodoController")
const Authenticate = require("../middlewares/authenticate")
const Autorization = require("../middlewares/autorization")

router.use(Authenticate)
router.post("/", TodoController.postTodo)
router.get("/", TodoController.getAllTodo)

// router.use("/:id", Autorization)
router.get("/:id", Autorization, TodoController.getTodoById)
router.put("/:id", TodoController.updateTodoById)
router.patch("/:id", TodoController.updateSpesificTodoById)
router.delete("/:id", TodoController.deleteTodoById)

module.exports = router