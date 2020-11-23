const { Todo } = require('../models')

class TodoController {
  static async createTodos(req, res) {
    try {
      const newData = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        dueDate: req.body.dueDate
      }
      const dataTodo = await Todo.create(newData)
      res.status(201).json(dataTodo)
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        res.status(400).json(error.errors[0].message)
      } else {
        res.status(500).json({ message: 'Internal server error' })
      }
    }
  }

  static async readTodos(req, res) {
    try {
      const dataTodo = await Todo.findAll()
      res.status(200).json(dataTodo)
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  static async readTodosById(req,res) {
    try {
      const findId = req.params.id
      const dataTodo = await Todo.findByPk(findId)
      if (dataTodo) res.status(200).json(dataTodo)
      else throw error
    } catch (error) {
      res.status(404).json('Error not found')
    }
  }

  static editTodosByRow(req, res) {
    const findId = req.params.id
    const editData = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      dueDate: req.body.dueDate
    }
    Todo.findByPk(findId)
      .then(todoData => {
        if (!todoData) res.status(404).json({ message: 'Error not found' })
        else return Todo.update(editData, { where: { id: findId }, returning: true })
      })
      .then(editedData => res.status(200).json(editedData[1][0]))
      .catch(error => {
        if (error.name === 'SequelizeValidationError') {
          const errors = error.errors.map(e => { return e.message })
          res.status(400).json(errors)
        } else {
          res.status(500).json({ message: 'Internal server error' })
        }
      })
  }

  static editTodosByColumn(req, res) {
    const findId = req.params.id
    const editData = { status: req.body.status }
    Todo.findByPk(findId)
      .then(todoData => {
        if (!todoData) res.status(404).json({ message: 'Error not found' })
        else return Todo.update(editData, { where: { id: findId }, returning: true })
      })
      .then(editedData => res.status(200).json(editedData[1][0]))
      .catch(error => {
        if (error.name === 'SequelizeValidationError') {
          const errors = error.errors.map(e => { return e.message })
          res.status(400).json(errors)
        } else {
          res.status(500).json({ message: 'Internal server error' })
        }
      })
  }

  static deleteTodos(req, res) {
    const findId = req.params.id
    Todo.findByPk(findId)
      .then(todoData => {
        if (!todoData) res.status(404).json({ message: 'Error not found' })
        else return Todo.destroy({ where: { id: findId }})
      })
      .then(() => res.status(200).json({ message: 'Todo success to delete' }))
      .catch(err => res.status(500).json({ message: 'Internal server error' }))
  }
}

module.exports = { TodoController }