module.exports = (err, req, res, next) => {
    if (err.name === 'SequelizeValidationError') {
        let arrErrors = []
        for (let i = 0; i < err.errors.length; i++) {
            arrErrors.push({message: err.errors[i].message})
        }
        res.status(400).json(arrErrors)
    } else if (err.status) {
        res.status(err.status).json({message: err.message})
    } else {
        res.status(500).json({message: 'Intenal Server Error'})
    }
}