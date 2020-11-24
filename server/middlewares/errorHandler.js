function errorHandler(err,req,res,next){
    if(err.status){
        res.status(err.status).json(err)
    }else if(err.name == 'SequelizeValidationError'){
        res.status(400).json({
            msg:err.message
        })
    }else if(err.name == 'SequelizeUniqueConstraintError'){
        res.status(400).json({
            msg:err.message
        })
    }else{
        res.status(500).json({
            msg:'Internal server error'
        })
    }
}

module.exports = errorHandler