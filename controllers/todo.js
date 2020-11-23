const { Todo } = require('../models')

class TodosController {

  static create(req, res) {
    const obj = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date
    }
    Todo.create(obj)
    .then(data => {
      res.status(201).json(data)
    })
    .catch(err => {
      res.status(500)
    })
  }

  static read(req, res) {
    Todo.findAll()
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(500)
    })
  }

  static findOne(req, res) {
    const id = req.params.id
   Todo.findOne({
     where: {
       id
     }
    })
    .then(data => {
      if(data) {
        res.status(200).json(data)
      } else {
        res.status(404).json({message: 'Error - Not Found'})
      }      
    })
    .catch(err => {
      res.status(500)
    })
  }

  static update(req, res) {
    const id = Number(req.params.id)

    const obj = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date
    }

    Todo.update(obj, {
      where: {
        id
      }
    })
    .then(data => {
      
    })
    .catch(err => {

    })
  }

  static editStatus(req, res) {

  }

  static delete(req, res) {
    const id = Number(req.params.id)

    
  }

}

module.exports = TodosController