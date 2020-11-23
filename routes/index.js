const router = require('express').Router()
const todoRouter = require('./todoRoutes')
const Controller = require('../controllers/controller')


router.get('/',Controller.getHome)
router.use('/todos',todoRouter)

module.exports = router
