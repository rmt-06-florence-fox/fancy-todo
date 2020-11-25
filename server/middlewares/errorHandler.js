const errorHandler = ((error, req, res, next) => {
    console.log(error)
    if(error.status){
        res.status(error.status).json({message: error.message})
    }
    else if(error.name === 'SequelizeValidationError'){
        res.status(400).json(error.errors[0].message)
    }
    else if(error.name === 'SequelizeUniqueConstraintError'){
        res.status(409).json(error.errors[0].message)
    }
    else if(error.name === 'SequelizeDatabaseError'){
        res.status(500).json({message: 'Please enter the correct date format'})
    }
    else{
        res.status(500).json(error)
    }
})

module.exports = errorHandler