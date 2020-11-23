const router = require('express').Router()
const todoRoutes = require('./todo')

router.use('/todos', todoRoutes)

module.exports = router
