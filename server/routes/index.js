const router = require('express').Router()
const TodoRoutes= require('./todo')
const {UserController} = require('../controllers')



router.get('/', (req,res)=>{
  res.send('Halo ini HomePage dari Router')
})
router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.use('/todos', TodoRoutes)


module.exports= router