const router = require('express').Router()
const {TodosController} = require('../controllers/index')
const authorization = require('../middlewares/authorization')


router.get('/', TodosController.getTodos)
router.post('/', TodosController.createTodo)

router.get('/:id', authorization, TodosController.getTodoById)
router.put('/:id', authorization, TodosController.editTodo)
router.patch('/:id', authorization,TodosController.editstatusTodo)
router.delete('/:id', authorization, TodosController.deleteTodo)


module.exports = router