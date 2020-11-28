const router = require('express').Router()
const TodosController = require('../controllers/todos')
const Authentication = require('../middlewares/authentication')
const Authorization = require('../middlewares/authorization')

router.use(Authentication)
router.get('/', TodosController.showTodos)
router.post('/', TodosController.createTodos)
router.get('/:id', Authorization, TodosController.showTodosId)
router.put('/:id', Authorization, TodosController.editTodos)
router.patch('/:id', Authorization, TodosController.updateTodos)
router.delete('/:id', Authorization, TodosController.deleteTodos)

module.exports = router