

const {User,Todo} = require('../models')

module.exports = (err, req, res, next) => {
  if(err){
    if (err.name === 'SequelizeValidationError') {
      let arrErrors = []
      for (let i = 0; i < err.errors.length; i++) {
          arrErrors.push( err.errors[i].message)
      }
    res.status(400).json({message: `${arrErrors} required` })
    }
    else {
      res.status(err.status).json({message: `Not Authorized`})
    }
  }
  else {
    
    res.status(500).json(err.message)
  }
  
 
}


