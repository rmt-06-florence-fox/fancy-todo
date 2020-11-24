const router = require('express').Router()
const TodosController = require('../controllers/todos')
const Authentication = require('../middlewares/authentication')

router.get('/', Authentication,TodosController.showTodos)

router.post('/', TodosController.createTodos)
router.get('/:id', TodosController.showTodosId) 
router.put('/:id', TodosController.editTodos)
router.patch('/:id', TodosController.updateTodos)
router.delete('/:id', TodosController.deleteTodos)

module.exports = router