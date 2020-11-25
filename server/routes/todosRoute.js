const router = require('express').Router()
const { TodoController } = require('../controller')
const authentication = require('../middleware/Authentification')
const authorization = require('../middleware/Authorization')

router.use(authentication)
router.get('/', TodoController.getTodos)
router.post('/', TodoController.createTodo)
router.put('/:id', authorization, TodoController.updateTodo)
router.patch('/:id', authorization, TodoController.updateStatusTodo)
router.delete('/:id', authorization, TodoController.deleteTodo)




module.exports = router