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
     res.status(500).json(error)
    } 
  }

  static async get (req, res, next) {
    try {
    res.send('enter in controller') 
   } catch (error) {
    res.send(error) 
   } 
  }

  static async getById (req, res, next) {

  }

  static async put (req, res, next) {

  }

  static async patch (req, res, next) {

  }

  static async delete (req, res, next) {

  }
}

module.exports = TodoController