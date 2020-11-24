module.exports = (err,req,res,next) => {
   console.log("Masuk error");
   if(err.status){
      res.status(err.status).json([{message:err.message}])
   }else if(err.name === 'SequelizeValidationError'){
      let errors = err.errors.map(item => {
         return {
            message:item.message
         }
      })
      res.status(400).json(errors)
   }else if(err.name === 'SequelizeDatabaseError'){
      res.status(400).json([{message:err.message}])
   }else{
      console.log("Masuk case terakhir");
      console.log(err);
      res.status(500).json([{message:err.message}])
   }
}