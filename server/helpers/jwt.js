const { LoginTicket } = require('google-auth-library')
const jwt = require('jsonwebtoken')

function generateToken(payload){
    return jwt.sign(payload, process.env.SECRETKEY)
}

function verifyToken(token){
    return jwt.verify(token, process.env.SECRETKEY)
}

module.exports = {
    generateToken , verifyToken
}