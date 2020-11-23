const jwt = require('jsonwebtoken')

function signToken(payload) {
    const access_token = jwt.sign(payload, process.env.SECRET)
    return access_token
}

function verifyToken(token) {
    const verToken = jwt.verify(token, process.env.SECRET)
    return verToken
}

module.exports = {
    signToken,
    verifyToken
}