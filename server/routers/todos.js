const router = require('express').Router()
const { TodoController } = require('../controllers')

router.post('/', TodoController.createTodos)
router.get('/', TodoController.home)
router.get('/:id', TodoController.searchTodo)
router.put('/:id', TodoController.editTodo)
router.patch('/:id', TodoController.modifyTodo)
router.delete('/:id', TodoController.deleteTodo)


module.exports = router;