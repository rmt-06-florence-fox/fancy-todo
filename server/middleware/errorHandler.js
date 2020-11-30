module.exports = (err, req, res, next) => {
  console.log(err, '<<< dari error handler')
  if (err.name == 'SequelizeValidationError') {
    const messages = err.message.map((el) => {
      message : el.message
    })
    res.status(err.status).json({messages})
  } else if (err.status) {
    res.status(err.status).json({message: err.message})
  } else {
    res.status(500).json({message: 'Internal Server Error'})
  }
}