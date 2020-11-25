module.exports = (err, req, res, next) => {
    if (err.status) {
        res.status(err.status).json ({
            message : err.msg
        })
    } else if (err.name === "SequelizeValidationError") { 
        res.status(400).json({
            message: err.errors[0].message
        })
    } else {
        res.status(500).json(err)
    }
}