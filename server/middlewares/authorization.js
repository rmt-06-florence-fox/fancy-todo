const JwtHelper = require('../helper/jwtHelper')
const { Todo } = require('../models')

module.exports = async (req,res,next)=>{

  // console.log('ada di mw authorization');
  // console.log(req.params.id,'<Todo id');
  // console.log(req.currentUser.email);
  // console.log(req.currentUser.id,'<user id');
  
  try {
    const todo = await Todo.findOne({where:{id: +req.params.id}})
    if(todo.UserId == req.currentUser.id){
      next()
    }else res.status(401).json({message: `you're not the one`});
  } catch (error) {
    res.status(500).json(error)
  }
 
  
}