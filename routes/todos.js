const router = require('express').Router()
const {TodosController} = require('../controllers/index')

router.get('/', TodosController.getTodos)
router.post('/', TodosController.createTodo)
router.get('/:id', TodosController.getTodoById)
router.put('/:id', TodosController.editTodo)
router.patch('/:id', TodosController.editstatusTodo)
router.delete('/:id', TodosController.deleteTodo)



module.exports = router