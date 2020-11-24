const router = require('express').Router()
const {TodoController} = require('../controllers')

router.get('/', TodoController.getTodos)
// router.get('/add', TodoController.addForm)
router.post('/', TodoController.add)
// router.get('/edit', TodoController.editForm)
// router.put('/edit/:id', TodoController.replace)
// router.patch('/edit/:id', TodoController.modify)
// router.delete('/delete/:id', TodoController.delete)

module.exports= router