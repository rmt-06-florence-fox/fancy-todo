const router = require('express').Router()
const ControllerUsers = require('../controllers/ControllerUsers')

router.post('/register', ControllerUsers.registerUser)
router.post('/login', ControllerUsers.loginUser)

module.exports = router