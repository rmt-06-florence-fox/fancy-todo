const {verify} = require('../helpers/jwt')

module.exports = (req,res,next) => {
   try{
      const {access_token} = req.headers
      if(!access_token){
         res.status(401).json({message:'You must login first'})
      }else{
         const decoded = verify(access_token)
         req.loggedIn = decoded
         next()
      }

   }catch(err){
      console.log(err);
   }
}