const { Todo } = require('../models')

class TodoController {
  static async create(req, res) {
    try {
      const payload = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        due_date: req.body.due_date
      }
      const data = await Todo.create(payload)
      res.status(201).json(data)
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        res.status(400).json(error.errors[0].message)
      } else {
        res.status(500).json({ msg: 'Internal Server Error'})
      }
    }
  }
}

module.exports = TodoController