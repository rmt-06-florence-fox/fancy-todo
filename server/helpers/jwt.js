const jwt = require('jsonwebtoken');

function generateToken(payload) {           //used in UserController
    return jwt.sign(payload, process.env.SECRET);
}
function verifyToken(token) {               //used in authentication.js (middlewares)
    return jwt.verify(token, process.env.SECRET);
}

module.exports = { generateToken, verifyToken }