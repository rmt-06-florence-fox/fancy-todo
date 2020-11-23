const express = require('express')
const router = express.Router()
const { TodoController } = require('../controllers/index')

router.get('/', TodoController.getTodos)
router.post('/', TodoController.createTodo)
router.get('/', TodoController.getTodos)
router.get('/', TodoController.getTodos)

module.exports = router