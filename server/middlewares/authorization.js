const JwtHelper = require('../helper/jwtHelper')
const { Todo } = require('../models')

module.exports = async (req,res,next)=>{

  console.log('ada di mw authorization');
  console.log(req.params.id,'<Todo id');
  console.log(req.currentUser.email);
  console.log(req.currentUser.id,'<user id');
  
  try {
    const todo = await Todo.findOne({where:{id: +req.params.id}})
    if(!todo){
      throw {status: 404, message:'data not found'}
    }
    console.log(todo);
    if(todo.UserId == req.currentUser.id){
      next()
    }else next({status: 401, message: `you're not the one` })
  } catch (error) {
    next(error)
  }
}

