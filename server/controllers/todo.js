const { Todo } = require("../models/index.js")

class TodosController {
  static async showTodos(req, res){
    try {
      const data = await Todo.findAll({
        where: {
          UserId: req.loggedInUser.id
        }
      })
      res.status(200).json(data)
    } catch (error) {
      res.status(500).json({message: "Internal Server Error"})
    }
  }

  static async createTodo(req, res){
    try {
      let payload = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        due_date: req.body.due_date,
        UserId: req.loggedInUser.id
      }
      const data = await Todo.create(payload)
      res.status(201).json(data)
      
    } catch (error) {
      if (error.name === "SequelizeValidationError"){
        let errors = []
        for (let i = 0; i < error.errors.length; i++){
          errors.push(error.errors[i].message)
        }
        console.log(error)
        res.status(400).json({message: errors})
      }
      else {
        res.status(500).json({message: "Internal Server Error"})
      }
    }
  }

  static async getTodoById(req, res){
    try {
      const data = await Todo.findByPk(req.params.id)
      if (!data){
        res.status(404).json({message: "Error! Data not found"})
      }
      else {
        res.status(200).json(data)
      }
    } catch (error) {
      res.status(500).json({message: "Internal Server Error"})
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
        res.status(404).json({message: "Error! Data not found"})
      }
      else {
        res.status(200).json(data[1][0])
      }
      
    } catch (error) {
      if (error.name === "SequelizeValidationError"){
        let errors = []
        for (let i = 0; i < error.errors.length; i++){
          errors.push(error.errors[i].message)
        }
        console.log(error)
        res.status(400).json({message: errors})
      }
      else {
        res.status(500).json({message: "Internal Server Error"})
      }
    }
  }

  static async editStatus(req, res){
    try {
      let payload = {
        status: req.body.status
      }

      const data = await Todo.update(payload, {
        where: {
          id: +req.params.id
        },
        fields: ['status'],
        returning: true,

      })
      if (!data[1].length){
        res.status(404).json({message: "Error! Data not found"})
      }
      else {
        res.status(200).json(data[1][0])
      }
      
    } catch (error) {
      if (error.name === "SequelizeValidationError"){
        let errors = []
        for (let i = 0; i < error.errors.length; i++){
          errors.push(error.errors[i].message)
        }
        console.log(error)
        res.status(400).json({message: errors})
      }
      else {
        res.status(500).json({message: "Internal Server Error"})
      }
    }
  }

  static async deleteTodo(req, res) {
    try {
      const data = await Todo.destroy({
        where: {
          id: +req.params.id
        }
      })
      if (data === 0){
        res.status(404).json({message: "Error! Data not found"})
      }
      else {
        res.status(200).json({message: "Todo is deleted successfully"})
      }
    } catch (error) {
      console.log(error.message)
      res.status(500).json({message: "Internal Server Error"})
    }
  }
}

module.exports = TodosController