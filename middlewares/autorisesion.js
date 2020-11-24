
const { verifyToken } = require("../helpers/jwt")
const {User,Todo} = require('../models')

module.exports = async (req,res,next) => {
  try {
   
    const loggedUserId = req.loginUser.id
    console.log(loggedUserId)
    let id = +req.params.id
      console.log(id)
   
   
      
      
      let data = await Todo.findOne({where: {id: id}})
      console.log(data)
      if (data.UserId === loggedUserId) {
        next()
      }
      else {
        throw {
          status: 401,
          message: `You Dont Have Permission to Do this Action`}
      
      }
    

  }
  catch(error){
    console.log(error)
    next(error)

  }
  


}