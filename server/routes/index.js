const router = require('express').Router()
const UserRoutes= require('./user')
const TodoRoutes= require('./todo')

router.get('/', (req,res)=>{
  res.send('Halo ini HomePage dari Router')
})

router.use('/users', UserRoutes)
router.use('/todos', TodoRoutes)


module.exports= router