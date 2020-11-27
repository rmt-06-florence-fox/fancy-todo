module.exports = (err, req, res, next) => {
    if (Array.isArray(err.errors)) {
        let obj = {
            message: []
        }
        for (let i = 0; i < err.errors.length; i++) {
            obj.message.push(err.errors[i].message)
        }
        res.status(400).json(obj)
    } else {
        if (err.status) {
            res.status(err.status).json({message: [err.message]})
        } else {
            if (err.name === 'SequelizeUniqueConstraintError') {
                res.status(400).json({message: [err.message]})
            } else if (err.name === 'SequelizeValidationError') {
                res.status(400).json({message: [err.errors[0].message]})
            } else {
                res.status(500).json({message: ['Intenal Server Error']})
            }
        }
    }
}