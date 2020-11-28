const jwt = require('jsonwebtoken')

function generateToken(dataObj) {
    return jwt.sign(dataObj, process.env.Secret)
}

function verifyToken(token) {
    return jwt.verify(token, process.env.Secret)
}

// function generateToken(dataObj) {
//     return jwt.sign(dataObj, 'rahasia')
// }

// function verifyToken(token) {
//     console.log(token, 'token');
//     return jwt.verify(token, 'rahasia')
// }

module.exports = {
    generateToken,
    verifyToken
}