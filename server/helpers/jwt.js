const jwt = require("jsonwebtoken")

function signToken(payload){
    const token = jwt.sign(payload, "secret")
    return token
}

function verifyToken(token){
    const decoded = jwt.verify(token, "secret")
    return decoded
}

module.exports = {
    signToken,
    verifyToken
}