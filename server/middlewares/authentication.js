const jwt = require('jsonwebtoken')
const { verifyToken } = require('../helpers/jwt')

async function authentication(req,res,next){
    try {
        let decoded = verifyToken(req.headers.token)
        req.loggedIn = decoded
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = authentication