//Authentication
const {User} = require('../models')
const {verifyToken} = require('../helpers')
const Authentication= async (req,res, next)=>{
  try {
    const {access_token} = req.headers
   
    if(!access_token){
      res.status(401).json({msg: 'Please Login'})
    }else{
      const decoded = verifyToken(access_token)
      const user = await User.findOne({
        where:{
          id : decoded.id
        }
      })
      req.loggedIn=decoded
      
      if(!user){
        res.status(404).json({msg: 'User Not Found'})
      }else{
        next()
      }
    }
  } catch (err) {
    res.status(401).json({status: 401, message: err.message})
  }

}

module.exports= Authentication