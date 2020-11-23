const router = require('express').Router()
const TodoController = require('../controllers/todoController')
router.get('/todos', TodoController.todo)


module.exports = router