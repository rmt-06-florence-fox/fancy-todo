const { Todo } = require('../models')

class TodosController {
  static async createTodos(req, res) {
    const value = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date
    }

    try {
      const data = await Todo.create(value)
      res.status(201).json(data)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  static async showTodos(req, res) {
    try {
      const data = await Todo.findAll()
      res.status(200).json(data)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  static async showTodosId(req, res) {
    try {
      const id = +req.params.id
      const data = await Todo.findByPk(id)``
      res.status(200).json(data)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  static async editTodos(req, res) {
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

  static async updateTodos(req, res) {
    try {
      const id = +req.params.id
      const value = {
        status: req.body.status
      }

      const data = await Todo.update(value, { where: { id }, returning: true })
      res.status(200).json(data[1][0])
    } catch (error) {
      res.status(500).json(error)
    }
  }

  static async deleteTodos(req, res) {
    try {
      const id = +req.params.id
      const data = await Todo.destroy({ where: { id } })
      res.status(201).json(data)
    } catch (error) {
      res.status(500).json(error)
    }
  }
}

module.exports = TodosController