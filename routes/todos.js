const router = require('express').Router()
const authenticate = require('../middlewares/authenticate')
const authorize = require('../middlewares/authorize')
const ControllerTodos = require('../controllers/ControllerTodos')

router.use(authenticate)
router.get('/', ControllerTodos.showToDos)
router.get('/showAll', ControllerTodos.showAllToDos)
router.get('/api', ControllerTodos.showCovid)
router.post('/', ControllerTodos.addToDo)

router.use('/:id', authorize)
router.get('/:id', ControllerTodos.showToDosById)
router.put('/:id', ControllerTodos.editToDo)
router.patch('/:id', ControllerTodos.updateStatus)
router.delete('/:id', ControllerTodos.deleteToDo)

module.exports = router