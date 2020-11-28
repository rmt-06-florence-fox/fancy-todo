const {Todo} = require('../models')
const axios = require('axios')



class Controller {
  static async getTodo(req,res,next){
    console.log('halo dr getTodo')
    try{
      const data = await Todo.findAll({where: {UserId:req.loginUser.id }})
      res.status(200).json(data)
      // res.send('ya')
    }
    catch(error) {
      next(error)
    }
  }

  static async postTodo(req,res,next){
    console.log(req.loginUser)
    const todo = {
      title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        due_date: new Date(req.body.due_date),
        UserId: req.loginUser.id
    }
     try {
       let data = await Todo.create(todo)
       res.status(201).json(data)
     }
     catch (error){
  
        next(error)
       
     }


  }
  
  static async getTodoId(req,res,next){
      try {
        let id = req.params.id
       
        let data = await Todo.findOne({where: {id:id}})
        if (!data){
          throw {
            status: 404,
            message: 'Data not found'
          }
          // res.status(404).json({message : 'Data not found'})
        }
        else{
          res.status(200).json(data)
        }
      } 
      catch (error) {
        next(error)
      }
  }

  static async putTodoId(req,res,next){
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
        // if(error.name === "SequelizeValidationError"){
        //   throw {
        //     status: 400,
        //     message: error.errors[0].message
        //   }
        //   // res.status(400).json(error.errors[0].message)
        // }
        // else {
          next(error)
        // }
        

    }
  }

  static async patchTodo(req,res,next){
    try{
      const id = req.params.id
      const updateStatus = {
        status: req.body.status
      }

      const data = await Todo.update(updateStatus,{
        where: {id}, returning:true
      })
      console.log(data)
      
      if (data[1].length === 0){
        throw {
          status: 404,
          message: 'Data not found'
        }
      }
      else{
        res.status(200).json(data[1][0])
      }
    
    }
    catch (error){
  
        next(error)
  
    }
  }

  static async deleteTodo(req,res,next){
    let id = +req.params.id
      try {
          let data = await Todo.destroy({
              where: {id},returning: true
          })
          
          if(!data){
            throw {
              status: 404,
              message: 'Data not found'
            }
            // res.status(404).json({message: 'Data not found'})
          } else{
            res.status(200).json({message:`Success Deleted`})
          }
      } 
      catch (error) {
        next(error)
      }

  }

  static async quote (req, res, next){
  
    try {
      let response = await axios({
          url: 'https://quote-garden.herokuapp.com/api/v2/quotes/random',
          method : 'GET',
          responseType : 'json'
      })

      //console.log(response)
      res.status(200).json(response.data.quote)
  
  } catch (err){
      next(err)
  }
}

}

module.exports = Controller