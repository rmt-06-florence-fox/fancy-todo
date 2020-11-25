const jwt = require('jsonwebtoken');

function generateToken(payload) {           //used in UserController
    return jwt.sign(payload, 'secret');
}
function verifyToken(token) {               //used in authentication.js (middlewares)
    return jwt.verify(token, 'secret');
}

module.exports = { generateToken, verifyToken }