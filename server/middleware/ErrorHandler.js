module.exports = function (err, req, res, next) {
    let message = 'internal server error'
    let statusCode = 500
    let errorCode = 'INTERNAL_SERVER_ERROR'

	switch (errorDesc) {
		case "SequelizeValidationError":
			status = 400;
			message = err.errors.map(el => {
				return el.message
			}).join(", ");
            break;
            
		case "InvalidEmailorPassword":
			status = 400;
			message = "Email or Password is Invalid!";
            break;
            
		case "AuthenticationFailed":
			status = 401;
			message = "Authentication failed!"
            break;
            
		case "Unauthorized":
			status = 403;
			message = "Unauthorized action!"
            break;
            
		case "NotFound":
			status = 404;
			message = "Not found!"
            break;
            
		default:
			status = 500;
			message = "Internal Server Error!"
	}

    return res.status(statusCode).json({message, errorCode})
}