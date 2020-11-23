const router = require('express').Router()
const { ToDoController } = require('../controllers')

router.get('/', ToDoController.getToDo)
router.post('/', ToDoController.createToDo)
router.get('/:id', ToDoController.getToDoById)
router.patch('/:id', ToDoController.checkToDo)
router.put('/:id', ToDoController.updateToDo)
router.delete('/:id', ToDoController.deleteToDo)

module.exports = router