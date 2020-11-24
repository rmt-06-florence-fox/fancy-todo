const router = require('express').Router()
const TodoController = require('../controllers/todo')

router.post('/todos', TodoController.create)
router.get('/todos', TodoController.get)
router.get('/todos/:id', TodoController.getById)
router.put('/todos/:id', TodoController.put)
router.patch('/todos/:id', TodoController.patch)
router.delete('/todos/:id', TodoController.delete)

module.exports = router