module.exports = (err, req, res, next) => {
    console.log(err);

    if (err.status) {
        res.status(err.status).json({message: err.message})
    } else if (err.name === 'SequelizeValidationError'){
        const errMessage = err.errors.map(el => {
            return el.message
        })
        res.status(400).json({message: errMessage})
    } else if (err.name === 'SequelizeUniqueConstraintError') {
        const errMessage = err.errors.map(el => {
            return el.message
        })
        res.status(400).json({message: errMessage})
    } else {
        res.status(500).json({message: err.message})
    }
}