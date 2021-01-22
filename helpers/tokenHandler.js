const jwt = require('jsonwebtoken')

function generateToken(id, email) {
    return jwt.sign({id, email}, process.env.JWT_SECRET)
}

function verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = {
    generateToken,
    verifyToken
}