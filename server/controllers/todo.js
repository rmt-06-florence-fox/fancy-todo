const { Todo } = require('../models')

class TodosController {

  static create(req, res, next) {
    const payload = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date,
      UserId: req.userData.id
    }
    Todo.create(payload)
    .then(data => {
      res.status(201).json(data)
    })
    .catch(err => {
      next(err)
    })
  }

  static read(req, res, next) {
    Todo.findAll({
      where: {
        UserId: req.userData.id
      }
    })
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      next(err)
    })
  }

  static findOne(req, res, next) {
    const id = req.params.id
    Todo.findByPk(id)
    .then(data => {
      if(data) {
        res.status(200).json(data)
      } else {
        next({name: "ErrorNotFound"})
      }      
    })
    .catch(err => {
      next(err)
    })
  }

  static update(req, res, next) {
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
        next({name: "ErrorNotFound"})
      }
    })
    .catch(err => {
      next(err)
    })
  }

  static editStatus(req, res, next) {
    const id = req.params.id
    const payload = {
      status: req.body.status
    }

    Todo.update(payload, {
      where: {
        id
      },
      returning: true
    })
    .then(data => {
      if(data != 0){
        res.status(200).json(data[1][0])
      } else {
        next({name: "ErrorNotFound"})
      }
    })
    .catch(err => {
      next(err)
    })
  }

  static delete(req, res, next) {
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
        next({name: "ErrorNotFound"})
      }
    })
    .catch(err => {
      next(err)
    })

    
  }

}

module.exports = TodosController