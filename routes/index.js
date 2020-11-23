const router = require('express').Router();
const todosRoutes = require('./todoRoutes.js')

router.use('/todos', todosRoutes)

module.exports = router