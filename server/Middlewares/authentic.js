const { User } = require('../models')
const {checkToken} = require('../helper/jwt')

module.exports =  (req, res, next) =>{
    try {
        const {token_access} = req.headers
        if(!token_access){
       throw{
           status: 401,
            message: ' You have to Login first'
        }
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
                    status: 401,
                    message: ' You have to Login first'
                }
            }
        })
        .catch(err =>{
           next(err)
        })
            
    }
    } catch (error) {
        next(error)
    }
    
}