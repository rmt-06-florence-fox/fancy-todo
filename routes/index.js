const express = require('express')
const router = express.Router()
const TodosRouter = require('./todos')

router.use('/todos', TodosRouter)

module.exports = router