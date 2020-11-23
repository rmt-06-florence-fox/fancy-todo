const router = require('express').Router()
const { ControllerTodo, ControllerMain } = require ('../controllers/index')

router.get('/', ControllerMain.home)

/* /todos */
router.get('/todos', ControllerTodo.get)
router.post('/todos', ControllerTodo.post)
router.get('/todos/:id', ControllerTodo.getId)
router.put('/todos/:id', ControllerTodo.putId)
router.patch('/todos/:id', ControllerTodo.patchId)
router.delete('/todos/:id', ControllerTodo.deleteId)

module.exports = router