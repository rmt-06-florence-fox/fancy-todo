const jwt = require('jsonwebtoken')

function generateToken(payload, secretKey) {
    return jwt.sign(payload, secretKey)
}

function verifyToken(token, secretKey) {
    return jwt.verify(token, secretKey)
}

module.exports = {generateToken, verifyToken}