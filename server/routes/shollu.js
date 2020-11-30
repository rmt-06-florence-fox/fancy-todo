const router = require('express').Router()
const { SholluController } = require('../controllers')
const authentication = require('../middlewares/authentication')

router.use(authentication)
router.get('/', SholluController.getSchedule)

module.exports = router