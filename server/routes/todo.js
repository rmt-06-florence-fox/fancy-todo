const router = require ('express').Router();
const todoController = require('../controllers/todo')

// router.get('/', (req, res) => {
//   res.status(200).json('wkwkw')
// })
router.get('/', todoController.getAllTodos)
router.post('/', todoController.createTodo)
router.get('/:id', todoController.getTodoById)
router.put('/:id', todoController.editTodoById)
router.patch('/:id', todoController.editTodoStatusById)
router.delete('/:id', todoController.deleteTodoById)

module.exports = router;