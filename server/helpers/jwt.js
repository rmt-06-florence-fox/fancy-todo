const jwt = require('jsonwebtoken');

function generateToken(payload) {
    return token = jwt.sign(payload, process.env.JWT_SECRET);
}

function verifyToken(access_token) {
    return decode = jwt.verify(access_token, process.env.JWT_SECRET)
}

module.exports = {
    generateToken,
    verifyToken
}