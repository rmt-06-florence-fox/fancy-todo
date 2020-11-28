const router = require('express').Router()
const { SholluController } = require('../controllers')

router.get('/', SholluController.getSchedule)

module.exports = router