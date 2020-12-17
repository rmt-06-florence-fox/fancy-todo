const {Todo} = require('../models')

class TodoController {
  static async create (req, res, next) {
    const {title, description, status, due_date} = req.body
    const UserId = req.loggedInUser.id
    try {
     const todo = await Todo.create({title, description, status, due_date, UserId}) 
     res.status(201).json({todo})
    } catch (error) {
     console.log(error); 
     res.status(400).json(error)
    } 
  }

  static async get (req, res, next) {
    try {
      const UserId = req.loggedInUser.id
      const todo = await Todo.findAll({where: {UserId}})
      res.status(200).json(todo)
    } catch (error) {
      next(error) 
   } 
  }

  static async getById (req, res, next) {
    try {
      const id = +req.params.id
      const todo = await Todo.findByPk(id)
      if (todo) {
        res.status(200).json(todo)
      } else {
        throw {msg: `todo with id ${id} is not found`, status: 404}
      }
    } catch (error) {
      next(error)
    }
  }

  static async put (req, res, next) {
    try {
      const {title, description, due_date, status} = req.body
      const id = +req.params.id
      const update = await Todo.update({title, description, due_date, status}, {where: {id}, returning: true})
      res.status(200).json(update)
    } catch (error) {
      next(error)
    }
  }

  static async patch (req, res, next) {
    try {
      const completed = await Todo.update({status: true}, {where: {id: +req.params.id}, returning: true})
      if (completed[0] !== 1) {
        throw { msg: `todo with id ${+req.params.id} is not found`, status: 404 }
      } else {
          res.status(200).json(completed[1][0])
      }
    } catch (error) {
      next(error)
    }
  }

  static async delete (req, res, next) {
    try {
      const id = +req.params.id
      await Todo.destroy({where: {id}}) 
      res.status(200).json({msg: 'todo success to delete'})
    } catch (error) {
      next(error)
    }
  }
}

module.exports = TodoController