module.exports = (err,req,res,next) => {

    if(err.status){
        res.status(err.status).json({
            message: err.message
        })
    } else if (err.name == "SequelizeValidationError") {
        const errorData = []
        for (let i = 0 ; i < err.errors.length; i++){
            errorData.push(err.errors[i].message)
        }
        res.status(400).json({message: errorData})
    } else {
        res.status(500).json({message: 'internal server error'})
    }

}