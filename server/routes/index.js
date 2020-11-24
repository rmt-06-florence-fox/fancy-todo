const router = require('express').Router()
const UserRoutes= require('./user')
const TodoRoutes= require('./todo')
const Login= require('./login')


router.get('/', (req,res)=>{
  res.send('Halo ini HomePage dari Router')
})

router.use('/login', Login)
router.use('/users', UserRoutes)
router.use('/todos', TodoRoutes)


module.exports= router