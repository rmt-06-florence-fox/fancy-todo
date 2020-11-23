const todos = require('express').Router()
const { TodoController } = require('../controllers')

// todos.get('/', (req, res) => {
//   res.send('hi')
// })
todos.post('/', TodoController.create)


/**
 * create todo
 * read todo
 * get todo by id
 * update todo (put)
 * update todo status (patch)
 * delete todo
 */
module.exports = todos