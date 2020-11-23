const router = require ('express').Router()
const todoRoute = require ("./todoRoute.js")

router.use ('/todos', todoRoute)

module.exports = router
