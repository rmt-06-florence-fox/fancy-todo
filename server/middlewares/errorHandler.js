
module.exports = function(err, req, res, next){
    console.log(err, "masuk ke sini bro")
    console.log(err.errors[0].message)
    let status = 500
    let msg = err.name || "internal server error"
    if (msg === "SequelizeValidationError"){
        status = 400
        const error = err.errors
        msg = ""
        error.forEach(el => {
            msg += `${el.message}, `
        });
        // console.log(msg)
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
    else if (msg === ""){

    }
    else {
        status = 500
        msg = "internal server error"
    }
    console.log(msg)
    res.status(status).json({msg})
}