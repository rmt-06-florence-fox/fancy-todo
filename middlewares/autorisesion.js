
const { verifyToken } = require("../helpers/jwt")
const {User,Todo} = require('../models')

module.exports = async (req,res,next) => {
  try {
   
    const loggedUserId = req.loginUser
   
   
      const decoded = verifyToken(access_token)
      let id = req.params.id
      
      let data = await Todo.findOne({where: {UserId: id}})
      // console.log(data)
      if (data.UserId === loggedUserId) {
        next()
      }
      else {
        res.status(401).json({message: `You Dont Have Permission to Edit`})
      }
    

  }
  catch(error){
    // console.log(error)
    res.status(401).json({message: `Invalid Data Input`})

  }
  


}