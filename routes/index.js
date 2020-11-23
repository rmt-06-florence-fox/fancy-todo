const router = require('express').Router();
const routerTodo = require('./routerTodo')

router.use('/todos', routerTodo)
router.get('/', (req, res)=>{
    res.send('HOME')
})





module.exports = router