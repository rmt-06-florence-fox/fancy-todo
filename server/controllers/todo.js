const { Todo } = require('../models')

class TodosController {

  static create(req, res) {
    const payload = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date
    }
    Todo.create(payload)
    .then(data => {
      res.status(201).json(data)
    })
    .catch(err => {
      if(err.errors) {
        const validationError = []
        err.errors.forEach(el => {
          validationError.push(el.message)
        })
        res.status(400).json({message: validationError.join(', ')})
      } else {
        res.status(500).json({message: 'Internal Server Error'})
      }
    })
  }

  static read(req, res) {
    Todo.findAll()
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(500).json({message: 'Internal Server Error'})
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
      res.status(500).json({message: 'Internal Server Error'})
    })
  }

  static update(req, res) {
    const id = Number(req.params.id)

    const payload = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date
    }

    Todo.update(payload, {
      where: {
        id
      }
    })
    .then(data => {
      if(data[0] != 0) {
        res.status(200).json(payload)   
      } else {
        res.status(404).json({message: 'Error - Not Found'})
      }
    })
    .catch(err => {
      if(err.errors) {
        res.status(400).json(err.errors)
      } else {
        res.status(500).json({message: 'Internal Server Error'})
      }
    })
  }

  static editStatus(req, res) {
    const id = req.params.id
    let payload = {
      status: req.body.status
    }

    Todo.update(payload, {
      where: {
        id
      }
    })
    .then(data => {
      if(data[0] != 0){
        res.status(200).json(data[1][0])
      } else {
        res.status(404).json({message: 'Error - Not Found'})
      }
    })
    .catch(err => {
      if(err.errors) {
        res.status(400).json(err.errors)
      } else {
        res.status(500).json({message: 'Internal Server Error'})
      }
    })
  }

  static delete(req, res) {
    const id = Number(req.params.id)

    Todo.destroy({
      where: {
        id
      }
    })
    .then(data => {
      if(data != 0) {
        res.status(200).json({message: 'Delete Success'})
      } else {
        res.status(404).json({message: 'Error - Not Found'})
      }
    })
    .catch(err => {
      res.status(500).json({message: 'Internal Server Error'})
    })

    
  }

}

module.exports = TodosController