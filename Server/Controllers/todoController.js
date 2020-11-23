const {Todo} = require('../models')

class TodoController{
  static async createTodo(req, res){
    try{
      const payload = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        due_date: req.body.due_date
      }
      const result = await Todo.create(payload, {
        returning : true
      })
      res.status(200).json(result)
    }catch(err){
      if(err.name === 'SequelizeValidationError') res.status(400).json(err)
      else res.status(500).json({message: `Internal server error`})
    }
  }
  static async readAllData(req, res){
    try{
      const result = await Todo.findAll()
      res.status(200).json({data: result})
    }catch(err){
      res.status(500).json({message: `Internal server error`})
    }
  }
  static async findDataByPk(req, res){
    try{
      const id = +req.params.id
      const result = await Todo.findByPk(id)
      if(result) res.status(200).json({data: result}) 
      else res.status(404).json({message: `Error Not Found`})
    }catch(err){
      res.status(500).json({message: `Internal server error`})
    }
  }
  static replaceData(req, res){
    const id = +req.params.id
    const payload = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date
    }
    Todo.findByPk(id)
      .then(data =>{
        if(!data) res.status(404).json({message: `Error Not Found`})
        else{
          return Todo.update(payload, {
            where: {id},
            returning: true
          })
        }
      })
      .then(data => res.status(200).json({result: data[1]}))
      .catch(err =>{
        if(err.name === 'SequelizeValidationError') res.status(400).json(err)
        else res.status(500).json({message: `Internal server error`})
      })
  }
  static modifyData(req, res){
    const id = +req.params.id
    const payload = { status: req.body.status }
    Todo.findByPk(id)
      .then(data =>{
        if(!data) res.status(404).json({message: `Error Not Found`})
        else{
          return Todo.update(payload, {
            where: {id},
            returning: true
          })
        }
      })
      .then(data => res.status(200).json({result: data[1]}))
      .catch(err =>{
        if(err.name === 'SequelizeValidationError') res.status(400).json(err)
        else res.status(500).json({message: `Internal server error`})
      })
  }
  static async deleteData(req, res){
    try{
      const id = +req.params.id
      const findData = await Todo.findByPk(id)
      if(!findData) res.status(404).json({message: `Error Not Found`})
      else{
        const result = await Todo.destroy({
          where: {id}
        })
        res.status(200).json({message: `todo success to delete`})
      }
    }catch(err){
      res.status(500).json({message: `Internal server error`})
    }
  }
}

module.exports = TodoController