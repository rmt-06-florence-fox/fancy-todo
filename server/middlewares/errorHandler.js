function errorHandler (err, req, res, next) {
  let status = 500
  let message = err.name || `Internal server error!`

  if(err.name === 'SequelizeValidationError') {
    status = 401
    let errors = []
    for (let i = 0; i < err.errors.length; i++) {
      errors.push(err.errors[i].message)
    }
    message = errors.join(', ')
  } 
  else if (err.name === 'SequelizeUniqueConstraintError') {
    status = 400
    message = 'Email is already taken!'
  } 
  else if (err.message === 'Request failed with status cpde 404') {
    status = 404
    message = 'Todo not found!'
  }
  else {
    status = err.status || 500
    message = err.message || 'Internal server error'
  }
  res.status(status).json({
      message
  })
}

module.exports = errorHandler