const router = require('express').Router()
const todosRoutes = require('./todos')


router.use('/todos', todosRoutes)




module.exports = router