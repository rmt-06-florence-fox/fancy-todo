module.exports = (err,req,res,next) => {
   if(err.status){
      console.log(err)
      res.status(err.status).json([{message:err.message}])
   }else if(err.name === 'SequelizeValidationError'){
      console.log(err)
      let errors = err.errors.map(item => {
         return {
            message:item.message
         }
      })
      res.status(400).json(errors)
   }else if(err.name === 'SequelizeDatabaseError'){
      res.status(400).json([{message:err.message}])
   }else{
      console.log(err)
      console.log("Masuk case terakhir");
      res.status(500).json([{message:err.message}])
   }
}