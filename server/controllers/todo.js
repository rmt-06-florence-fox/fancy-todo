const {Todo}= require('../models')
class TodoController{

  static async create(req,res){
    const newTodo = {
      tittle : req.body.tittle,
      description : req.body.description,
      status : req.body.status,
      due_date: req.body.due_date
    }
    
    try{
      const data = await Todo.create(newTodo)
      console.log('a');
      res.status(201).json(data)
    }catch(error){
      res.status(500).json(error)
    }
  }

  static findAll(req,res){
    res.send('asad')
  }
}

module.exports = TodoController

