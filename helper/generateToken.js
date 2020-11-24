const jwt = require("jsonwebtoken")

function generateToken(token) {
    return jwt.sign(token, process.env.SECRET)
}

function verifyToken(token) {
    return jwt.verify(token, process.env.SECRET)
}

module.exports = {
    generateToken,
    verifyToken
}