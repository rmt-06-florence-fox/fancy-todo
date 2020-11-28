const router = require ('express').Router();
const todoController = require('../controllers/todo')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')

// router.get('/', (req, res) => {
//   res.status(200).json('wkwkw')
// })
router.get('/api', todoController.API)
router.use(authentication)

router.get('/', todoController.getAllTodos)
router.post('/', todoController.createTodo)
router.get('/:id', todoController.getTodoById)


router.use('/:id',authorization)
router.put('/:id', todoController.editTodoById)
router.patch('/:id',  todoController.editTodoStatusById)
router.delete('/:id', todoController.deleteTodoById)

module.exports = router;