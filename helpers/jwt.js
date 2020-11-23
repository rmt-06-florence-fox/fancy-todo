const jwt = require('jsonwebtoken')

function sign(payload, secretKey) {
    return jwt.sign(payload, secretKey)
}

module.exports = {sign}