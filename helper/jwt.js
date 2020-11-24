const jwt = require('jsonwebtoken')

function generateToken(param){
    return jwt.sign(param, process.env.SECRET)
}

function verifyToken(token){
    return jwt.verify(token, process.env.SECRET)
    
}
module.exports = {
    generateToken,
    verifyToken
}

