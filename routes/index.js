const router = require('express').Router()
const routerTodos = require('./todos')
const routerUsers = require('./users')

router.get('/', (req, res) => {
    res.send('hello')
})
router.use('/todos', routerTodos)
router.use('/users', routerUsers)

module.exports = router