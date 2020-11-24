const jwt = require('jsonwebtoken')

function generateToken(id, email) {
    return jwt.sign({id, email}, 'boomboomsplash')
}

function verifyToken(token) {
    return jwt.verify(token, 'boomboomsplash')
}

module.exports = {
    generateToken,
    verifyToken
}