const router = require('express').Router()
const usersController = require('../controller/usersController')

router.get('/', usersController)


module.exports = router