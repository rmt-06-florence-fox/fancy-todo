//Authentication
const {User} = require('../models')
const {verifyToken} = require('../helpers')
const Authentication= async (req,res, next)=>{
  try {
    const {access_token} = req.headers
   
    if(!access_token){
      throw{
        status: 401,
        message: 'Please Login'
      }
    }else{
      const decoded = verifyToken(access_token)
      const user = await User.findOne({
        where:{
          id : decoded.id
        }
      })
      req.loggedIn=decoded
      
      if(!user){
        throw{
          status: 401,
          message: 'Please Login'
        }
      }else{
        next()
      }
    }
  } catch (err) {
    next(err)
  }

}

module.exports= Authentication