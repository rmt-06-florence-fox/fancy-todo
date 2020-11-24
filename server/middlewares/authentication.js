const JwtHelper = require('../helper/jwtHelper')
const { User } = require('../models')

module.exports = async (req,res,next)=>{
  const rawtoken = req.headers.access_token;
  let access_token
  try {
    access_token = JwtHelper.decodeToken(rawtoken)
  } catch (error) {
    res.status(401).json({message: 'please login first'})
  }

  try {
    if(access_token){
      const user = await User.findOne({where:{id: access_token.id}})
      if(user){
        next();
      } else res.status(401).json({message: 'please login first'})
    }else{
      res.status(401).json({message: 'please login first'})
    }
  } catch (error) {
    res.status(500).json(error)
  }

  // next();
}