const router = require('express').Router();
const routerTodo = require('./routerTodo')
const authentic = require('../Middlewares/authentic')
const UserController = require('../controllers/userController')

router.use('/todos', routerTodo)
router.get('/', (req, res)=>{
    res.send('HOME')
})

router.post('/register', UserController.registerForm)
router.post('/login', UserController.loginForm)
router.post('/googleLogin', UserController.googleLogin)





module.exports = router