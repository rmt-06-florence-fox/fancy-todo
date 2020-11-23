const router = require('express').Router()
const todos = require('./todos')
const user = require('./users')


router.use('/todos', todos)
router.use('/', user)


module.exports = router
