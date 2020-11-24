const e = require("express");

module.exports = (err, req, res, next)=>{
    console.log('Di error handler');
    // console.log(err);
    if (err.status){
        res.status(err.status).json({
            message: err.message
        })
    } else if (err.name == 'SequelizeValidationError'){
        console.log(err.errors);
        const errMsg = err.errors.map(el => {
            return el.message
        })
        res.status(400).json({
            message: errMsg
        })
    }  else {
        res.status(500).json({message: 'Internal server error'})
    }
}