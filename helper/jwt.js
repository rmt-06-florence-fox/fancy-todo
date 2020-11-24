const jwt = require("jsonwebtoken")

function generateToken(payload) {
    return jwt.sign(payload, process.env.SECRET, { expiresIn: 60 * 30 })
}

function verifyToken(token) {
    return jwt.verify(token, process.env.SECRET);
}

module.exports = {
    generateToken,
    verifyToken
}