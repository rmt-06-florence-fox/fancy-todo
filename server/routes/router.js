const router = require('express').Router()
const routerTodo = require ('./router-todo')
const routerUser = require ('./router-user')


router.use('/', routerUser)

/* /todos */
router.use('/todos', routerTodo)

module.exports = router