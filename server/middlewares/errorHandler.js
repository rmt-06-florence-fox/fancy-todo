module.exports = (err, req, res, next) => {
    if (err.status){ // dari throw
        res.status(err.status).json({status: err.status, message: err.message})
    } else if (Array.isArray(err.errors)) { // err validasi sequelize
        const newErr = err.errors.map(el => {
            return el.message
        })
        res.status(400).json(newErr)
    } else {
        res.status(500).json(err)
    }
}