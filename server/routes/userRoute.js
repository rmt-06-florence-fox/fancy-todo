const router = require('express').Router()
const { UserController } = require('../controller')
const ThirdParty = require('../controller/thirdParty')

router.post('/register',  UserController.register)
router.post('/login', UserController.login)
router.post('/googleLogin', UserController.googleLogin)
router.get('/sholat', ThirdParty.sholatTime)



module.exports = router