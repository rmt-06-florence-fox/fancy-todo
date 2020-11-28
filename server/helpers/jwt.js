const jwt = require('jsonwebtoken')

function generateToken(payload) {
    return jwt.sign(payload, 'rahasiarangga')
}

function verifyToken(token) {
    return jwt.verify(token, 'rahasiarangga')
}

module.exports = { generateToken, verifyToken }