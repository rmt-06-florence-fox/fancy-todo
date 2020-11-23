const router = require('express').Router()
const ControllerTodos = require('../controllers/ControllerTodos')

router.get('/', ControllerTodos.showToDos)
router.post('/', ControllerTodos.addToDo)
router.get('/:id', ControllerTodos.showToDosById)
router.put('/:id', ControllerTodos.editToDo)
router.patch('/:id', ControllerTodos.updateStatus)
router.delete('/:id', ControllerTodos.deleteToDo)

module.exports = router