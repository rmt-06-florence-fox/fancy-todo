const {User} = require('../models')

class UserController{

  static async register(req,res){
    let obj = {
      first_name : req.body.first_name,
      last_name : req.body.last_name,
      email : req.body.email,
      password : req.body.password,
    }
    try {
      const data = await User.create(obj)
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
  //     first_name : req.params.first_name,
  //     last_name : req.params.last_name,
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

module.exports = UserController