const router = require('express').Router()
const Controller = require('../controllers/controller')

router.post('/register',Controller.register)
router.post('/login',Controller.login)
router.post('/googleLogin',Controller.googleLogin)

router.post('/githubLogin',Controller.githubLogin)
module.exports = router