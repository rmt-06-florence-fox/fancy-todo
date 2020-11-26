//Error Handler

const e = require("express")

function errorHandler(err,req,res,next){
  if(err.status){
    res.status(err.status).json({
      message: err.message
    })
  }else if(err.name == "SequelizeValidationError"){
    const errors= err.errors.map(error=>({
      message: error.message
    }))
    res.status(400).json(errors)
  }else{
    res.status(500).json(err)
  }
  
}

module.exports= errorHandler