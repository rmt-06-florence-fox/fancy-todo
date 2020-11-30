module.exports = (err, req, res, next) => {
    if(err.status){
        console.log(err.status, err.message)
        res.status(err.status).json({
            message: err.message
        })
    }else if(err.name === 'SequelizeValidationError'){
       res.status(400).json(err.errors[0].message)
    }else{
        res.status(500).json(err)
    }
}