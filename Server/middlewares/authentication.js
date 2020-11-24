const Helper = require('../Helper/helper')
const { User } = require('../models')

module.exports = async (req, res, next)=>{
  try{
    // console.log(req.headers);
    const {access_token} = req.headers
    // console.log(access_token);
    if(access_token){
      const decoded = Helper.verifyToken(access_token)
      // console.log(decoded);
      req.loginUser = decoded
      const user = await User.findOne({
        where: { id: decoded.id }
      })
      if (user) next()
      else res.status(401).json({msg: 'Please Login First'})
    }
  }catch(err){
    res.status(500).json({msg: 'Internal server error'})
  }
}