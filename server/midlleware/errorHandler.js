function errorHandler(err, req, res, next) {
    if(err.status){
        console.log(err.message)
        res.status(err.status).json({message: err.message})
      }else if(err.name == 'JsonWebTokenError') {
        res.status(401).json({message: "please login first!"})
      }else if(err.name === ''){
        throw({status: 404,
            message: "Data not found!"        
        })
      }
      else if(err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError"){
        let errors = []
        for (let i = 0; i < err.errors.length; i++){
          errors.push(err.errors[i].message)
        }
        console.log(err.message)
        res.status(400).json({message: errors})
      }else {
        console.log(err.message)
        res.status(500).json({messages: "Internal server error"})
      }
}

module.exports = errorHandler