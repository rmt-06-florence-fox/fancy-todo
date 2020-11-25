module.exports = (err, req, res, next) => {
    console.log (err, "ERROR HANDLER DIATAS IF")
    if (err.status) {
        
        res.status(err.status).json ({
            message : err.msg
        })
    } else if (err.name === "SequelizeValidationError") { 
        res.status(400).json({
            message: err.errors[0].message
        })
    } else {
        console.log (err)
        res.status(500).json(err)
    }
}