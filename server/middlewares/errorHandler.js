
module.exports = function(err, req, res, next){
    console.log(err, "masuk ke sini bro")
    let status = 500
    let msg = err.name || "internal server error"
    if (msg === "SequelizeValidationError"){
        status = 400
        const error = err.errors
        msg = ""
        error.forEach(el => {
            msg += `${el.message}, `
        });
    }
    else if (msg === "SequelizeUniqueConstraintError"){
        status = 400
        msg = "email must be unique"
    }
    else if (msg === "AuthenticationFailed"){
        status = 401
        msg = "Please login first"
    }
    else if (msg === "TodoNotfound"){
        status = 404
        
        msg = "Sorry, no todo was found with matching credentials"
    }
    else if (msg === "NotAuthorized"){
        status = 401
        msg ="Sorry, you are not authorized to access this todo"
    }
    else {
        status = 500
        msg = "internal server error"
    }
    res.status(status).json({msg})
}