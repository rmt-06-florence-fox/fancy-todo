function  errorHandler(err,req,res,next){
    console.log('=================Error Handler=================')
    console.log(err)
    if(err.status){
        console.log('============= Get Error Status===============')
        console.log(err.status)
        res.status(err.status).json({message : err.message})
    }else if(err.name == 'SequelizeValidationError' || err.name == 'SequelizeUniqueConstraintError' ){
        console.log('================Error Sequelize=================')
        console.log(err.name)
        if(Array.isArray(err)){
            console.log('===========Is array==========')
            let message = err.map(element =>{
                return element.message
            }) 
            res.status(400).json({message })
        }else {
            console.log('==============not array===================')
            console.log(err.errors[0].message)
            res.status(400).json({message : err.errors[0].message})
        }
    }else {
        console.log('===================== Error 500=================')
        res.status(500).json({err : 'Internal Server Error'})
    }
}


module.exports = errorHandler