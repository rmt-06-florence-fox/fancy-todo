const router = require('express').Router()
const { TodoController } = require('../controllers')

router.post('/', TodoController.createTodo)
router.get('/', TodoController.getTodo)
router.get('/:id', TodoController.getOneTodo)
router.put('/:id', TodoController.editTodo)
router.patch('/:id', TodoController.updateTodoStatus)
router.delete('/:id', TodoController.deleteTodo)

module.exports = router