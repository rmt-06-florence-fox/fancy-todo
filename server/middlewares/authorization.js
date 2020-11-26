//Authorization
const {Todo} = require('../models')
const Authorization= async (req,res, next)=>{
  try {
    const todo= await Todo.findOne({
      where:{id: +req.params.id }
    })
    if(todo.UserId != req.loggedIn.id){
      throw{
        status: 401,
        message: 'You are not allowed to access this todo'
      }
    }else{
      next()
    }
  } catch (err) {
    next(err)
  }
}

module.exports= Authorization