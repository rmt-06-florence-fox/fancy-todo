const router = require('express').Router()
const todoRoutes = require('./todo')
const userRoutes = require('./user')

router.use('/todos', todoRoutes)
router.use('/', userRoutes)

module.exports = router
