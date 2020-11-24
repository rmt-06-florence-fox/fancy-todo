const router = require('express').Router()
const todoRouter = require('./todorouter')
const userRouter = require('./userrouter')

router.use('/', userRouter)
router.use('/todos', todoRouter)

module.exports = router