//Authorization
const {Todo} = require('../models')
const Authorization= async (req,res, next)=>{
  try {
    const todo= await Todo.findOne({
      where:{id: +req.params.id }
    })
    if(todo.UserId != req.loggedIn.id){
      res.status(401).json({status: 401,message:'You not allowed to access this todo'})
    }else{
      next()
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

module.exports= Authorization