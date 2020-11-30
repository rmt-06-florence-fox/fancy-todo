const router = require('express').Router()
const { ToDoController } = require('../controllers')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use(authentication)
router.get('/', ToDoController.getToDo)
router.post('/', ToDoController.createToDo)
router.get('/holidays', ToDoController.holiday)
router.get('/:id', authorization, ToDoController.getToDoById)
router.patch('/:id', authorization, ToDoController.checkToDo)
router.delete('/:id', authorization, ToDoController.deleteToDo)

module.exports = router