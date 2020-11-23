const {Todo} = require('../models')

class Controller {
  static async getTodo(req,res){
    try{
      const data = await Todo.findAll()
      res.status(200).json(data)
      // res.send('ya')
    }
    catch(error) {
      res.status(500).json(error)
    }
    
   
  }

  static async postTodo(req,res){
    const todo = {
      title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        due_date: new Date(req.body.due_date),
    }
     try {
       let data = await Todo.create(todo)
       res.status(201).json(data)
     }
     catch (error){
       if(error.name === "SequelizeValidationError"){
         res.status(400).json(error.errors[0].message)
       }
       res.status(500).json(error)
     }


  }
  
  static async getTodoId(req,res){
      try {
        let id = req.params.id
       
        let data = await Todo.findByPk(id)
        if (!data){
          res.status(404).json({message : 'Data not found'})
        }
        else{
          res.status(200).json(data)

        }
      
        
      } 
      catch (error) {
        
        res.status(500).json(error)
      }
  }

  static async putTodoId(req,res){
    try{
      const id = req.params.id
      const update = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        due_date: req.body.due_date,
      }

      const data = await Todo.update(update,{
        where: {id}, returning:true
      })
      res.status(200).json(data[1][0])

    }
    catch (error){
      res.status(500).json(error)

    }
  }

  static async patchTodo(req,res){
    try{
      const id = req.params.id
      const updateStatus = {
        status: req.body.status
      }

      const data = await Todo.update(updateStatus,{
        where: {id}, returning:true
      })
      res.status(200).json(data[1][0])

    }
    catch (error){
      res.status(500).json(error)

    }
  }

  static async deleteTodo(req,res){
    let id = +req.params.id
      try {
          let data = await Todo.destroy({
              where: {id},returning: true
          })
       
          res.status(200).json(data[1][0])
          if(!data){
              res.status(404).json({message: `error not found`})
          }
      } 
      catch (error) {
          res.status(500).json(error)
      }

  }

}

module.exports = Controller