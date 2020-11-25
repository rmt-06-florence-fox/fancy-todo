module.exports = function (err, req, res, next) {
console.log("🚀 ~ file: errorHandler.js ~ line 2 ~ err", err)
  let statusCode = 500
  let msg = 'Internal Server Error!'

  switch(err.name) {
    case 'SequelizeValidationError':
      statusCode = 400
      msg = err.errors[0].message
      break
    case 'SequelizeUniqueConstraintError':
      statusCode = 400
      msg = err.error[0].message
      break
  }
  console.log(err);
  res.status(statusCode).json({msg})
}