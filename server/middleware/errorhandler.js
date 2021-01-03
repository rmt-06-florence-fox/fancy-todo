module.exports = (err, req, res, next) => {
  console.log("error handler start");
  console.log(err);
  if(err.status) {
    res.status(err.status).json({
      message: err.message
    })
  } else if(err.name == 'SequelizeUniqueConstraintError' || err.name == 'SequelizeValidationError'){
    const errors = err.errors.map(el => ({message: el.message}))
    res.status(400).json(errors)
  } else {
    res.status(500).json(err)
  }
  
}