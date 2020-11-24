
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
        const error = err.errors
        msg = "email must be unique"
    }
    else if (msg === "AuthenticationFailed"){
        status = 401
        const error = err.errors
        msg = "Please login first"
    }
    res.status(status).json({msg})
}