const {verify} = require('../helpers/jwt')

module.exports = (req,res,next) => {
   try{
      const {access_token} = req.headers
      if(!access_token){
         throw({
            status:401,
            message:"You must login first error Handle"
         })
      }else{
         const decoded = verify(access_token)
         req.loggedIn = decoded
         next()
      }

   }catch(err){
      next(err);
   }
}