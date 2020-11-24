module.exports = (err,req,res,next)=>{
  
  if(err.status) res.status(err.status).json(err.message)
  else if(err.name === 'SequelizeValidationError'){
    const errors = err.errors.map(e=>({messages: e.message}))
    res.status(400).json({message:errors})
  }
  else res.status(500).json(err)
}