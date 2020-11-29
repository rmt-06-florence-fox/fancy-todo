const jwt = require('jsonwebtoken')

function generateToken(dataObj) {
    return jwt.sign(dataObj, process.env.Secret)
}

function verifyToken(token) {
    return jwt.verify(token, process.env.Secret)
}

module.exports = {
    generateToken,
    verifyToken
}