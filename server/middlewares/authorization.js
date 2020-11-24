const {Todo} = require('../models/index')

module.exports = async (req,res,next) => {
   const id = +req.params.id
   const UserId = req.loggedIn.id
   try {
      const todo = await Todo.findOne({
         where:{
            id,
            UserId
         }
      })
      if(todo)
         next();
      else
         res.status(401).json({message:"You are not authorized"})
      
   } catch (error) {
      console.log(error);
   }
}