const express = require('express')
const router = express.Router()
const ThirdPartyApi = require('../controllers/3rdPartyApi')
const authentication = require('../middlewares/authentication')

router.use(authentication)
router.get('/', ThirdPartyApi.getQoute)

module.exports = router