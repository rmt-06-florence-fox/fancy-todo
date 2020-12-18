const jwt = require('jsonwebtoken');
require('dotenv').config();

function generateToken(payload) {
    return jwt.sign(payload, process.env.SECRET)
}

function verifyToken(encoded) {
    return jwt.verify(encoded, process.env.SECRET)
}

module.exports = {
    generateToken,
    verifyToken
}