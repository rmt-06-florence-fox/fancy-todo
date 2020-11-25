const jwt = require ('jsonwebtoken')

function generateToken (obj) {
    return jwt.sign(obj, process.env.SECRET)
}

function verifyToken (token) {
    return jwt.verify(token, process.env.SECRET)
}

module.exports = {generateToken, verifyToken}