const { User } = require('../models')
const {checkToken} = require('../helper/jwt')

module.exports =  (req, res, next) =>{
    try {
        const {token_access} = req.headers
        if(!token_access){
        res.status(401).json({
            message: ' You have to Login first'
        })
    } else {
        var decoded = checkToken(token_access)
        User.findOne({
            where:{
                id: decoded.id
            }
        })
        .then(user =>{
            if(user){
                req.loggedId = decoded
                next()
            } else {
                throw {
                    message: ' You have to Login first'
                }
            }
        })
        .catch(err =>{
            console.log('errr dr authen')
            res.status(401).json(err)
        })
            
    }
    } catch (error) {
        console.log(error)
        res.status(401).json({
            message: ' You have to Login first'
        })
    }
    
}