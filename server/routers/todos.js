const router = require('express').Router()
const { TodoController } = require('../controllers')
const { authentication, authorization } = require('../middlewares')

router.use(authentication)
router.post('/', TodoController.createTodos)
router.get('/', TodoController.home)

router.use('/:id', authorization)
router.get('/:id', TodoController.searchTodo)
router.put('/:id',TodoController.editTodo)
router.patch('/:id',TodoController.updateStatusTodo)
router.delete('/:id',TodoController.deleteTodo)


module.exports = router;