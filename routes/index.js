const router = require ('express').Router()
const todoRoute = require ("./todoRoute.js")
const userRoute = require ("./userRoute.js")

router.use ('/todos', todoRoute)
router.use ('/users', userRoute)

module.exports = router
