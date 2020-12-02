const jwt = require('jsonwebtoken')
const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

async function authentication(req,res,next){
    try {
        let decoded = verifyToken(req.headers.token)
        req.loggedIn = decoded
        let user = User.findOne({
            where:{
                id: decoded.id
            }
        })
        if(user){
            next()
        }else{
            throw{
                status: 400,
                msg: 'user not found'
            }
        }
    } catch (err) {
        next(err)
    }
}

module.exports = authentication