const {Todo} = require('../models')

class TodoController{
  static async createTodo(req, res, next){
    try{
      const payload = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        due_date: req.body.due_date,
        UserId: req.loginUser.id
      }
      const result = await Todo.create(payload)
      res.status(201).json(result)
    }catch(err){
      if(err.name === 'SequelizeValidationError'){
        next({
          name: 'Validation Error',
          status: 400,
          message: err.errors
        })
      }else next(err)
    }
  }
  static async readAllData(req, res, next){
    try{
      console.log(req.loginUser, '<<<< user login dari controller');
      const result = await Todo.findAll({
        where:{
          UserId: req.loginUser.id
        }
      })
      res.status(200).json({data: result})
    }catch(err){
      next(err)
    }
  }
  static async findDataByPk(req, res, next){
    try{
      const id = +req.params.id
      const result = await Todo.findByPk(id)
      if(result) res.status(200).json({data: result}) 
      else{
        throw {
          status: 404,
          message: `Data Not Found`
        }
      }
    }catch(err){
      next(err)
    }
  }
  static replaceData(req, res, next){
    const id = +req.params.id
    const payload = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date,
      UserId: req.loginUser.id
    }
    Todo.findByPk(id)
      .then(data =>{
        if(!data){
          throw {
            status: 404,
            message: `Data Not Found`
          }
        }else{
          return Todo.update(payload, {
            where: {id},
            returning: true
          })
        }
      })
      .then(data => res.status(200).json({result: data[1]}))
      .catch(err =>{
        if(err.name === 'SequelizeValidationError'){
          next({
            name: 'Validation Error',
            status: 400,
            message: err.errors
          })
        }
        else next(err)
      })
  }
  static modifyData(req, res, next){
    const id = +req.params.id
    const payload = { status: req.body.status }
    Todo.findByPk(id)
      .then(data =>{
        if(!data){
          throw {
            status: 404,
            message: `Data Not Found`
          }
        } else if(!req.body.status){
          throw {
            status: 400,
            message: `Status can't be empty`
          }
        } else{
          return Todo.update(payload, {
            where: {id},
            returning: true,
            validate: false     //dipakai karena jika dia mengubah status menjadi 'selesai', maka ga akan kena validasi
          })
        }
      })
      .then(data => res.status(200).json({result: data[1]}))
      .catch(err =>{
        next(err)
      })
  }
  static async deleteData(req, res, next){
    try{
      const id = +req.params.id
      const findData = await Todo.findByPk(id)
      if(!findData){
        throw {
          status: 404,
          message: `Data Not Found`
        }
      } else{
        const result = await Todo.destroy({
          where: {id}
        })
        res.status(200).json({message: `todo success to delete`})
      }
    }catch(err){
      next(err)
    }
  }
}

module.exports = TodoController