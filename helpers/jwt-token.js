const jwt = require('jsonwebtoken')

function getToken(obj) {
    return jwt.sign({id: obj.id, username: obj.username}, process.env.SECRET)
}

function verify(token) {
    return jwt.verify(token, process.env.SECRET)
}

module.exports = { getToken, verify }