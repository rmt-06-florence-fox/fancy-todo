const router = require ('express').Router()
const todoRoute = require ("./todoRoute.js")
const userRoute = require ("./userRoute.js")
const Controller = require ("../controllers/index.js")

router.get ('/', Controller.dashboard)
router.use ('/todos', todoRoute)
router.use ('/users', userRoute)

module.exports = router
