const express = require('express')
const router = express.Router()
const TodosRouter = require('./todos')
const UserRouter = require('./user')
const authentication = require('../middlewares/authentication')

router.use('/', UserRouter)

router.use(authentication)
router.use('/todos', TodosRouter)

module.exports = router