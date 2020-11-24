const router = require('express').Router()
const todoRouter = require('./todo')
const userRouter = require('./user')

router.use('/', userRouter)
router.use('/todos', todoRouter)

module.exports = router