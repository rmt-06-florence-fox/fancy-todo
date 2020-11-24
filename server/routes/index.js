const router = require('express').Router()
const todosRouter = require('./todos-router')
const loginRouter = require('./login-router')
const registerRouter = require('./register-router')

router.use('/todos', todosRouter)
router.use('/login', loginRouter)
router.use('/register', registerRouter)

module.exports = router