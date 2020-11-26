const { ToDo } = require('../models')

class ToDoController {
  static async createToDo (req, res, next) {
    try {
      const todo = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        due_date: req.body.due_date,
        UserId: req.loginUser.id
      }
    }
    const todo = await ToDo.findAll();
    res.status(200).json(todo)
  }
}

module.exports = ToDoController