const router = require('express').Router()
const {TodoController} = require('../controllers')

router.post('/', TodoController.create)
router.get('/', TodoController.findAll)


module.exports = router