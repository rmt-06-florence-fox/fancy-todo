const jwt = require('jsonwebtoken')
const secret = process.env.JWT


function generateToken(object) {
    return jwt.sign(object,'secret')
}

function verifyToken(token){
    return jwt.verify(token,'secret')
}

module.exports = {generateToken,verifyToken}