const router = require('express').Router()
const TodosController = require('../controllers/todos')

router.post('/', TodosController.createTodos)
router.get('/', TodosController.showTodos)
router.get('/:id', TodosController.showTodosId) 
router.put('/:id', TodosController.editTodos)
router.patch('/:id', TodosController.updateTodos)
router.delete('/:id', TodosController.deleteTodos)

module.exports = router