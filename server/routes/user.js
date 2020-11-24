const router = require('express').Router()
const {UserController} = require('../controllers')

router.post('/', UserController.register)
// router.put('/:id', UserController.replace)
// router.patch('/:id', UserController.modify)
// router.delete('/:id', UserController.delete)


module.exports= router