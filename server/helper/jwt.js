const jwt = require("jsonwebtoken");

function sign(id, email, fullName) {
    return jwt.sign({ id, email, fullName }, process.env.SECRET, { expiresIn: 60 * 60 });
}

function verifyToken(token) {
    return jwt.verify(token, process.env.SECRET);
}

module.exports = {
    sign,
    verifyToken
}