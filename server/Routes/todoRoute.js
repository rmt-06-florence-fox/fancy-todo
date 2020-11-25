const router = require("express").Router()
const TodoController = require("../controllers/TodoController")
const Authenticate = require("../middlewares/authenticate")
const Autorization = require("../middlewares/autorization")

router.use(Authenticate)
router.post("/", TodoController.postTodo)
router.get("/", TodoController.getAllTodo)
router.get("/holidays", TodoController.getHolidays)
router.get("/:id", TodoController.getTodoById)

router.use("/:id", Autorization)
router.put("/:id", TodoController.updateTodoById)
router.patch("/:id", TodoController.updateSpesificTodoById)
router.delete("/:id", TodoController.deleteTodoById)

module.exports = router