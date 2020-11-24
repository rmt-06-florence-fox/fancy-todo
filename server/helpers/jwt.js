const jwt = require("jsonwebtoken");

function loginToken(payload) {
    const token = jwt.sign(payload, +process.env.SECRET);
    return token;
}

function verifyToken(token) {
    const decoded = jwt.verify(token, +process.env.SECRET);
    return decoded;
}

module.exports = {
    loginToken,
    verifyToken
}