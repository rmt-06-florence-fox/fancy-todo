const {Todo} = require('../models')

class TodoController{
  static async show(req,res){
    try {
      const list = await Todo.findAll()
      if (list) {
        res.status(200).json(list)
      } else {
        res.status(404).json({message :`error not found`})
      }
    } catch (error) {
      res.status(500).json(error)
    }
  }

  static async create(req,res){
    let obj = {
      title : req.body.title,
      description : req.body.description,
      status : false,
      due_date : req.body.due_date,
    }
    try {
      const data = await Todo.create(obj)
      res.status(201).json(data)
    } catch (error) {
      if (error.name == 'SequelizeValidationError') {
        res.status(400).json(error.errors)
      } else {
        res.status(500).json(error)
      }
    }
  }

  static async seeList(req,res){
    let id = req.params.id
    try {
      const list = await Todo.findOne({where: {id}})
      if (list) {
        if (list) {
          res.status(200).json(list)
        } else {
          res.status(404).json({message :`error not found`})
        }
      } else {
        res.status(404).json({message :`error not found`})
      }
    } catch (error) {
      res.status(500).json(error)
    }
  }

  static async update(req,res){
    let id = req.params.id
    let obj = {
      title : req.body.title,
      description : req.body.description,
      status : req.body.status,
      due_date : req.body.due_date
    }
    try {
      const data = await Todo.update(obj,{where : {id}, returning: true})
      if (data) {
        res.status(200).json(data[1][0])
      } else {
        res.status(404).json({message :`error not found`})
      }
    } catch (error) {
      if (error.name == 'SequelizeValidationError') {
        res.status(400).json(error.errors)
      } else {
        res.status(500).json(error)
      }
    }
  }

  static async patch(req,res){
    let id = req.params.id
    let obj = {
      status : req.body.status
    }
    try {
      const data = await Todo.update({status : obj.status},{where : {id}, returning: true})
      if (data) {
        res.status(200).json(data[1][0])
      } else {
        res.status(404).json({message :`error not found`})
      }
    } catch (error) {
      if (error.name == 'SequelizeValidationError') {
        res.status(400).json(error.errors)
      } else {
        res.status(500).json(error)
      }
    }
  }

  static async delete(req,res){
    let id = req.params.id
    try {
      const list = await Todo.destroy({where: {id}})
      if (list) {
        res.status(200).json({message :`todo success to delete`})
      } else {
        res.status(404).json({message :`error not found`})
      }
    } catch (error) {
      res.status(500).json(error)
    }
  }

}

module.exports = TodoController