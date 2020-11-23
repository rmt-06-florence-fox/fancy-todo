const router = require('express').Router()
const todoRouter = require('./todorouter')
const userRouter = require('./userrouter')

router.use('/todos', todoRouter)
router.use('/users', userRouter)

module.exports = router