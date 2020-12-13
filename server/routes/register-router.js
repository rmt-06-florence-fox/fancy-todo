const router = require('express').Router()
const { UserController } = require('../controllers')

router.post('/', UserController.addUser)

module.exports = router