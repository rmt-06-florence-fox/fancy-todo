const {Todo} = require('../models')

class TodoController{
  static async getAllTodos (req, res){
    try {
      const todos = await Todo.findAll()

      console.log(todos);
      res.status(200).json(todos)
    } catch (err) {
      console.log(err);
      res.status(500).json(err)
    }
  }

  static async createTodo(req, res) {
    try {
      const {title, description, status, due_date} = req.body

      const todo = await Todo.create({
        title, description, status, due_date
      })

      res.status(201).json(todo)
    } catch (err) {
      res.status(500).json(err)
    }
  }
}

module.exports = TodoController