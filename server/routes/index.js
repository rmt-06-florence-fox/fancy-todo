const router = require('express').Router();
const todosRoutes = require('./todoRoutes.js')
const userRoutes = require('./userRoutes.js')


router.use('/todos', todosRoutes)
router.use('/user', userRoutes)

module.exports = router