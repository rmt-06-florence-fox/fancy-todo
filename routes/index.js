const router = require('express').Router()
const todoRoutes = require('./todo')
const userRoutes = require('./user')
const authentication = require('../middlewares/authentication')

router.use('/', userRoutes)

router.use(authentication)
router.use('/todos', todoRoutes)

module.exports = router
