const router = require ('express').Router()
const TodoController = require ('../controllers/todoController.js')

router.get ("/", TodoController.findTodos)
router.get ("/find/:id", TodoController.findTodoById)
router.post ("/add", TodoController.addTodos)
router.patch ("/update/status/:id", TodoController.updateTodo)
router.put ("/update/:id", TodoController.updateTodoo)
router.get ("/delete/:id", TodoController.removeTodo)

module.exports = router
