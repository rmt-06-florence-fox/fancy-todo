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
      res.status(201).json(data)
    }catch(error){
      res.status(500).json(error.errors[0].message)
    }
  }

  static async findAll(req,res){
    try{
      const todos =  await Todo.findAll()
      res.status(200).json(todos)
    }catch(error){
      res.status(500).json(error)
    }
  }

  static async findOne(req,res){
    try{
      const id = +req.params.id
      const todo = await Todo.findOne({where: {id:id}})
      res.status(200).json(todo)
    }catch(error){
      res.status(404).json(error)
    }
  }

  static async editPut(req,res){
    
    const id = req.params.id
    const editedTodo = {
      tittle : req.body.tittle,
      description : req.body.description,
      status : req.body.status,
      due_date: req.body.due_date
    }
    try{
      const data = await Todo.update(editedTodo,{where : {id:id}, returning:true})
      if(data[0] > 0){
        res.status(200).json(data)
      }else{
        res.status(404).json({error: 'Id not found'})
      }
    }catch (error) {
      if(error.errors[0].type =='Validation error'){
        res.status(400).json(error.errors[0].message)
      } else {
        res.status(500).json(error)
      }
    }
  }

  static async editPatch(req,res){
    const id = req.params.id
    const editedTodo = {
      status : req.body.status
    }
    try{
      const data = await Todo.update(editedTodo,{where : {id:id}, returning:true})
      if(data[0] > 0){
        res.status(200).json(data)
      }else{
        res.status(404).json({error: 'Id not found'})
      }
    }catch (error) {
      if(error.errors[0].type =='Validation error'){
        res.status(400).json(error.errors[0].message)
      } else {
        res.status(500).json(error)
      }
    }
  }

  static async delete(req,res){
    const id = req.params.id
    try {
      const data = await Todo.destroy({where: {id:id},returning:true})
      if(data>0){
        res.status(200).json({message:'todo success to delete'})
      }else{
        res.status(404).json({error: 'Id not found'})
      }
    } catch (error) {
      res.status(500).json(error)
    }
  }
}

module.exports = TodoController

