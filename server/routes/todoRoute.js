const router = require ('express').Router()
const TodoController = require ('../controllers/todoController.js')
const authentication = require ('../middlewares/authentication')
const authorization = require ('../middlewares/authorization.js')

router.use (authentication)
router.get ("/", TodoController.findTodos)
router.post ("/", TodoController.addTodos)
router.get ("/:id", authorization, TodoController.findTodoById)
router.patch ("/:id", authorization, TodoController.updateTodo)
router.put ("/:id", authorization, TodoController.updateTodoo)
router.delete ("/:id", authorization, TodoController.removeTodo)
router.get ("/:id", authorization, TodoController.findTodoById)

module.exports = router
