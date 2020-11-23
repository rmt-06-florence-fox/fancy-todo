const router = require('express').Router()
const routerTodo = require ('./router-todo')
const { ControllerMain } = require ('../controllers/index')

router.get('/', ControllerMain.home)

/* /todos */
router.use('/todos', routerTodo)

module.exports = router