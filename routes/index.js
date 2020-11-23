const router = require('express').Router();
const routerTodo = require('./routerTodo')
const routerUser = require('./routerUser')

router.use('/todos', routerTodo)
router.use('/users', routerUser)
router.get('/', (req, res)=>{
    res.send('HOME')
})





module.exports = router