const {Todo} = require('../models')

class TodoController{
  // static async show(req,res){
  //   try {
  //     const list = await Todo.findAll()
  //     res.status(200).json(list)
  //   } catch (error) {
  //     res.status(500).json(error)
  //   }
  // }

  static async create(req,res){
    let obj = {
      title : req.body.title,
      description : req.body.description,
      status : req.body.status,
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

  // static async seeList(req,res){
  //   let id = req.params.id
  //   try {
  //     const list = await Todo.findOne({where: {id}})
  //     res.status(200).json(list)
  //   } catch (error) {
  //     res.status(500).json(error)
  //   }
  // }

  // static async update(req,res){
  //   let id = req.params.id
  //   let obj = {
  //     title : req.params.title,
  //     description : req.params.description,
  //     status : req.params.status,
  //     due_date : req.params.due_date,
  //   }
  //   try {
  //     const data = await Todo.update(obj,{where : {id}, returning : true})
  //     res.status(200).json(data[1][0])
  //   } catch (error) {
  //     if (error.name == 'SequelizeValidationError') {
  //       res.status(400).json(error.errors)
  //     } else {
  //       res.status(500).json(error)
  //     }
  //   }
  // }

}

module.exports = TodoController