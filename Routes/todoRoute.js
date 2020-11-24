const router = require("express").Router()
const TodoController = require("../controllers/TodoController")
const Authenticate = require("../middlewares/authenticate")
const Autorization = require("../middlewares/autorization")

router.use(Authenticate)
router.post("/", TodoController.postTodo)
router.get("/", TodoController.getAllTodo)

router.use("/:id", Autorization)
router.get(TodoController.getTodoById)
router.put(TodoController.updateTodoById)
router.patch(TodoController.updateSpesificTodoById)
router.delete(TodoController.deleteTodoById)

module.exports = router