const errorMessage = require("../helpers/errorMessage")

const errorHandler = (err, req, res, next) => {
  let statusCode;
  let message;
  console.log(err)
  
  if(err.name === "SequelizeValidationError"){
    statusCode = 400
    message = errorMessage(err)
  } else if (err.name === "ErrorNotFound"){
    statusCode = 404
    message = "Error Not Found"
  } else if (err.name === "EmailAlreadyUsed") {
    statusCode = 400
    message = "Email has been already used"
  } else if (err.name === "InvalidEmailPassword") {
    statusCode = 400
    message = "Email or password is incorrect"
  } else if (err.name === "AccessDenied") {
    statusCode = 404
    message = "Invalid Token"
  } else if (err.name === "AuthenticationFailed") {
    statusCode = 401
    message = "User not Authenticated"
  } else if (err.name === "ForbiddenAccess") {
    statusCode = 400
    message = "User did not have access"
  } else {
    statusCode = 500
    message = "Internal Server Error"
  }

  res.status(statusCode).json({message})
}

module.exports = errorHandler