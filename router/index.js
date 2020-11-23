const express = require('express')
const Controller = require('../controllers/todo')
const routerTodos = require('./todosRouter')
const router = express.Router()

router.use('/todos', routerTodos )
module.exports = router