const { Todo } = require('../models')

class TodoController {
  static getAll (req, res, next) {
    const UserId = req.loggedUser.id
    Todo.findAll({
      where: { UserId }
    })
    .then(data => {
      // console.log(data, '<-- data dari getAll')
      res.status(200).json(data)
    })
    .catch(err => {
      // console.log(err, '<-- error dari getAll')
      next(err)
    })
  }
  
  static createTodo (req, res, next) {
    const obj = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date,
      UserId: req.loggedUser.id
    }
    Todo.create(obj)
    .then(data => {
      // console.log(data, '<-- dari createTodo')
      res.status(201).json(data)
    })
    .catch(err => {
      // console.log(err, '<-- dari create Todo')
      next(err)
    })
    
  }

  static find (req, res, next) {
    Todo.findOne({
      where: { id: req.params.id }
    })
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      next(err)
    })

  }

  static edit (req, res, next) {
    const value = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date
    }
    const id = req.params.id
    Todo.findByPk(id)
    .then(data => {
      if (data) {
        Todo.update(value, {
          where: {id}
        })
      }
      res.status(200).json(data)
    })
    .catch(err => {
      next(err)
    })

  }

  static update (req, res, next) {
    const id = req.params.id
    const value = {status: req.body.status}
    // console.log(value, '<-- value dari update')
    Todo.findByPk(id)
    .then(data => {
      if (data) {
        Todo.update(value, {
          where: {id}
        })
      }
      // console.log(data, '<-- dari update')
      res.status(200).json(data)
    })
    .catch(err => {
      next(err)
    })

  }

  static delete (req, res, next) {
    const id = req.params.id
    console.log(id, '<-- dari delete')
    Todo.destroy({where: {id}})
    .then(() => {
      res.status(200).json({message: `Task successfully deleted !`})
    })
    .catch(err => {
      // console.log(err, '<-- dari delete Todo')
      next(err)
    })
  }
}

module.exports = TodoController