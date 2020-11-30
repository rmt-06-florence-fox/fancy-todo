const Helper = require('../Helper/helper')
const { User } = require('../models')

module.exports = async (req, res, next)=>{
  try{
    const {access_token} = req.headers
    if(access_token){
      const decoded = Helper.verifyToken(access_token)
      req.loginUser = decoded
      const user = await User.findOne({
        where: { id: decoded.id }
      })
      if (user) next()
      else{
        throw {
          status: 401,
          message: 'Please Login First'
        }
      }
    }else{
      throw {
        status: 401,
        message: 'Please Login First'
      }
    }
  }catch(err){
    next(err)
  }
}