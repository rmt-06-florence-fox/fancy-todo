const router = require('express').Router()
const { TodoController } = require('../controller')

router.get('/', TodoController.getTodos)
router.post('/', TodoController.createTodo)
router.put('/:id', TodoController.updateTodo)
router.patch('/:id', TodoController.updateStatusTodo)
router.delete('/:id', TodoController.deleteTodo)


module.exports = router