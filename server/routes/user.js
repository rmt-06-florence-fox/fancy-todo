const router = require('express').Router()
const {UserController} = require('../controllers')

router.get('/', UserController.getUsers)
// router.get('/register', UserController.registerForm)
router.post('/', UserController.register)
// router.get('/login', UserController.loginForm)
// router.post('/login', UserController.login)
// router.get('/edit', UserController.editForm)
// router.put('/edit/:id', UserController.replace)
// router.patch('/edit/:id', UserController.modify)
// router.delete('/delete/:id', UserController.delete)


module.exports= router