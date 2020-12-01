const { Todo } = require('../models')

class TodosController {
  static async createTodos(req, res, next) {
    const value = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date,
      UserId: req.SignedIn.id
    }

    try {
      const data = await Todo.create(value)
      res.status(201).json(data)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  static async showTodos(req, res, next) {
    try {
      const data = await Todo.findAll({ 
        where: { 
          UserId: req.SignedIn.id
        },
        order: [['status', 'desc']]
      })
      res.status(200).json(data)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  static async showTodosId(req, res, next) {
    try {
      const id = +req.params.id
      const data = await Todo.findByPk(id)
      res.status(200).json(data)
    } catch (error) {
      res.status(404).json(error)
    }
  }

  static async editTodos(req, res, next) {
    try {
      const id = +req.params.id
      const value = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        due_date: req.body.due_date
      }

      const data = await Todo.update(value, { where: { id }, returning: true })
      res.status(200).json(data[1][0])
    } catch (error) {
      res.status(500).json(error)
    }
  }

  static async updateTodos(req, res, next) {
    try {
      const id = +req.params.id
      const value = {
        status: `Done`
      }

      const data = await Todo.update(value, { where: { id }, returning: true })
      res.status(200).json(data[1][0])
    } catch (error) {
      res.status(500).json(error)
    }
  }

  static async deleteTodos(req, res, next) {
    try {
      const id = +req.params.id
      const data = await Todo.destroy({ where: { id } })
      res.status(201).json({
        msg: `Todo Success to delete`
      })
    } catch (error) {
      res.status(500).json(error)
    }
  }
}

module.exports = TodosController