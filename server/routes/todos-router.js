const router = require('express').Router()
const {TodosController} = require('../controllers')

router.post('/', TodosController.addTodo)
router.get('/', TodosController.allTodo)
router.get('/:id', TodosController.getTodo)
router.put('/:id', TodosController.updateTodo)
router.patch('/:id', TodosController.updateStatus)
router.delete('/:id', TodosController.delTodo)

module.exports = router