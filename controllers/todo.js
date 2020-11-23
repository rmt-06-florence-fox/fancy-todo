const { Todo } = require("../models/index.js")

class TodosController {
  static async showTodos(req, res){
    try {
      const data = await Todo.findAll()
      res.status(200).json(data)
    } catch (error) {
      res.status(500).json(err)
    }
  }

  static async createTodo(req, res){
    try {
      let payload = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        due_date: req.body.due_date
      }
      const data = await Todo.create(payload)
      res.status(201).json(data)
      
    } catch (error) {
      if (error.name === "SequelizeValidationError"){
        res.status(400).json(error.errors)
      }
      else {
        res.status(500).json(error)
      }
    }
  }

  static async getTodoById(req, res){
    try {
      const data = await Todo.findByPk(req.params.id)
      if (!data){
        throw("Data not found")
      }
      else {
        res.status(200).json(data)
      }
    } catch (error) {
      res.status(404).json(error)
    }
  }

  static async replaceTodo(req, res){
    try {
      let payload = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        due_date: req.body.due_date
      }
      const data = await Todo.update(payload, {
        where: {
          id: +req.params.id
        },
        returning: true
      })

      if (!data[1].length){
        throw(res.status(404).json(error))
      }
      else {
        res.status(200).json(data[1][0])
      }
      
    } catch (error) {
      if (error.name === "SequelizeValidationError"){
        res.status(400).json(error.errors)
      }
      else {
        res.status(500).json(error)
      }
    }
  }

  static editStatus(req, res){

  }

  static deleteTodo(req, res) {

  }
}

module.exports = TodosController