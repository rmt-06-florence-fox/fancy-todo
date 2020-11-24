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

  static async getTodoById(req, res) {
    try {
      const {id} = req.params

      const todo = await Todo.findByPk(id)

      res.status(200).json(todo)
    } catch (err) {
      console.log(err);
    }
  }  

  static async editTodoById(req, res) {
    try {
      const {id} = req.params

      const {title, description, status, due_date} = req.body

      const todo = Todo.update({
        title, description, due_date, status
      }, {
        where: {
          id
        }
      })

      res.status(201).json(todo)
    } catch (err) {
      res.status(500).json(err)
    }
  }

  static async editTodoStatusById(req, res) {
    try {
      const {id} = req.params

      const {status} = req.body

      const todo = Todo.update({
        status
      }, {
        where: {
          id
        }
      })

      res.status(201).json(todo)
    } catch (err) {
      res.status(500).json(err)
    }
  }

  static async deleteTodoById(req, res){
    try{
      const {id} = req.params
      const todo = Todo.destroy({
        where:  {
          id
        }
      })

      res.status(201).json("todo successfully deleted")
    } catch(err){
      res.status(500).json(err)
    }
  }
}

module.exports = TodoController