const { Todo } = require('../models')

class TodoController {
  static async createTodos(req, res) {
    try {
      const newData = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        dueDate: req.body.dueDate
      }
      const dataTodo = await Todo.create(newData)
      res.status(201).json(dataTodo)
    } catch (error) {
      console.log(error)
      res.status(500).json({ msg: 'Internal server error' })
    }
  }

  // static createTodos(req, res) {
  //   const newData = {
  //     title: req.body.title,
  //     description: req.body.description,
  //     status: req.body.status,
  //     dueDate: req.body.dueDate
  //   }
  //   Todo.create(newData)
  //     .then(dataTodo => res.status(201).json(dataTodo))
  //     .catch(error => res.status(500).json({ msg: 'Internal server error' }))
  // }
}

module.exports = TodoController