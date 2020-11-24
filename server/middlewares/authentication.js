const JwtHelper = require('../helper/jwtHelper')

module.exports = (req,res,next)=>{
  const rawtoken = req.headers.access_token;
  console.log(JwtHelper.decodeToken(rawtoken));
  console.log('test');
  next();
}