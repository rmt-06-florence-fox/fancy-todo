const JwtHelper = require('../helper/jwtHelper')
const { User } = require('../models')

module.exports = async (req,res,next)=>{
  const rawtoken = req.headers.access_token;
  let access_token
  try {
    access_token = JwtHelper.decodeToken(rawtoken)
  } catch (error) {
    next({status: 401, message: 'please login first' })
  }

  try {
    if(access_token){
      const user = await User.findOne({where:{id: access_token.id}})
      if(user){
        req.currentUser = access_token
        next();
      } else next({status: 401, message: 'please login first' })
    }else{
      next({status: 401, message: 'please login first' })
    }
  } catch (error) {
    next({status: 401, message: 'internal server error' })
  }
}