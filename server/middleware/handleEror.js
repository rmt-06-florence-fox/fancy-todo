function handleEror(err, req, res, next) {
    console.log(err)
    if(err.status) {
        res.status(err.status).json({ errors: err.message})
    }else if (err.name == 'SequelizeUniqueConstraintError' || err.name == 'SequelizeValidationError') {
        const errors = err.errors.map(e => e.message)
        res.status(400).json({errors})
    }else {
        res.status(500).json({errors: `Internal Server Error`})
    }
}

module.exports = handleEror