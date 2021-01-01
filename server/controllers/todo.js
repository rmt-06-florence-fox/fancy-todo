const { Todo } = require("../models/index.js")

class TodosController {
  static async showTodos(req, res, next){
    try {
      const data = await Todo.findAll({
        where: {
          UserId: req.loggedInUser.id
        }
      })
      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }

  static async createTodo(req, res, next){
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
      next(error)
    }
  }

  static async getTodoById(req, res, next){
    try {
      const data = await Todo.findByPk(req.params.id)
      if (!data){
        throw({
          status: 404,
          message: "Error! Data not found"
        })
      }
      else {
        res.status(200).json(data)
      }
    } catch (error) {
      next(error)
    }
  }

  static async replaceTodo(req, res, next){
    try {
      let payload = {
        title: req.body.title,
        description: req.body.description,
        due_date: req.body.due_date
      }
      const data = await Todo.update(payload, {
        where: {
          id: +req.params.id
        },
        validate: false,
        returning: true,
      })
      if (!data[1].length){
        throw({
          status: 404,
          message: "Error! Data not found"
        })
      }
      else {
        res.status(200).json(data[1][0])
      }
      
    } catch (error) {
      next(error)
    }
  }

  static async editStatus(req, res, next){
    try {
      let payload = {
        status: req.body.status
      }

      const data = await Todo.update(payload, {
        where: {
          id: +req.params.id
        },
        fields: ['status'],
        returning: true

      })
      if (!data[1].length){
        throw({
          status: 404,
          message: "Error! Data not found"
        })
      }
      else {
        res.status(200).json(data[1][0])
      }
      
    } catch (error) {
      next(error)
    }
  }

  static async deleteTodo(req, res, next) {
    try {
      const data = await Todo.destroy({
        where: {
          id: +req.params.id
        }
      })
      if (data === 0){
        throw({
          status: 404,
          message: "Error! Data not found"
        })
      }
      else {
        res.status(200).json({message: "Todo is deleted successfully"})
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = TodosController