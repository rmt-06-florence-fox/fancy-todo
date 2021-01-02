function errorHandler(err, req, res, next){
    //console.log(err, '<<<<< OOOPPS')
    if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
        //console.log(';masuk validasi')
        let message = err.errors.map(e => {
            return e.message
        })
        res.status(400).json({ errors: message })

    } else {
        if(!err.status) err.status = 500
        res.status(err.status).json({errors :[ err.message]})
    }
}

module.exports = errorHandler