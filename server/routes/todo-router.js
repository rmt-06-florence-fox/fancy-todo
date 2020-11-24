const router = require('express').Router()
const ToDoController = require('../controllers/todo-controller')

router.get('/', ToDoController.findAll)

//router.use(authenticate)
router.post('/',ToDoController.addTodo)
router.get('/:id', ToDoController.findById)
router.put('/:id', ToDoController.updateById)
router.patch('/:id', ToDoController.updateStatus)
router.delete('/:id', ToDoController.deleteById)

module.exports = router