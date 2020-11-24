const {Todo} = require('../models')

class TodoController{
  static getTodos(req,res){
    res.send(' Halo ini Todo dari TodoController')
    
  }
  static async add(req,res){
    let newTodo= {
      name: req.body.name,
      description: req.body.description,
      due: req.body.due,
      status: req.body.status,
      category: req.body.category
    }
    try {
      let todo= await Todo.create(newTodo)
      res.status(200).json({status: '200 OK', message: `Success Create Todo`, newTodo})
    } catch (err) {
      let message=err.errors[0].message
      res.status(400).json({status: '400 Bad Request',message})
    }
    
  }
}

module.exports= TodoController