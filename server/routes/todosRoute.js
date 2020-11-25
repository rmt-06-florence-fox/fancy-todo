const router = require('express').Router()
const { TodoController } = require('../controller')
const authentication = require('../middleware/Authentification')

router.put('/:id', TodoController.updateTodo)
router.patch('/:id', TodoController.updateStatusTodo)
router.delete('/:id', TodoController.deleteTodo)

router.use(authentication)
router.get('/', TodoController.getTodos)
router.post('/', TodoController.createTodo)



module.exports = router