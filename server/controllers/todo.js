const {Todo} = require('../models')

class TodoController{
  static async getAllTodos (req, res){
    try {
      const UserId = req.currentUser.id
      console.log(UserId + 'ini current user');
      const todos = await Todo.findAll({
        where: {
          UserId
        }
      })

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
      const UserId = req.currentUser.id

      const todo = await Todo.create({
        title, description, status, due_date, UserId
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
    console.log('di cont');
   
    try {
      const {id} = req.params

      const {status} = req.body

      const todo = await Todo.update({status}, {
        where: {
          id
        },
        returning: true
      })

      console.log(todo);
      res.status(201).json(todo[1][0])
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