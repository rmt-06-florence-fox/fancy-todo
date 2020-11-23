const todos = require('express').Router()
const { TodoController } = require('../controllers')

// todos.get('/', (req, res) => {
//   res.send('hi')
// })

todos.post('/', TodoController.create)

todos.get('/', TodoController.read)
todos.get('/:id', TodoController.findId)
todos.put('/:id', TodoController.updateAll)
todos.patch('/:id', TodoController.updateStatus)
todos.delete('/:id', TodoController.delete)

/**
 * create todo (v)
 * read todo (v)
 * get todo by id (v)
 * update todo (put) (v)
 * update todo status (patch) (v)
 * delete todo (v)
 */
module.exports = todos