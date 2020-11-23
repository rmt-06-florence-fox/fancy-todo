const router = require('express').Router()
const todoRouter = require('./todoRoutes')
const userRouter = require('./userRoutes')
const Controller = require('../controllers/controller')


router.get('/',Controller.getHome)
router.use('/todos',todoRouter)
router.use('/users',userRouter)

module.exports = router
