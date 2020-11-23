const router = require('express').Router()
const Controller = require('../controller/controller')

router.get('/', Controller.show)
router.post('/', Controller.create)
router.get('/:id', Controller.seeList)
router.put('/:id', Controller.update)
router.patch('/:id', Controller.patch)
router.delete('/:id', Controller.delete)

module.exports = router