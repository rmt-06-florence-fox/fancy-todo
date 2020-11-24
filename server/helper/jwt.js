const jwt = require("jsonwebtoken");

function sign(id, email, fullName) {
    return jwt.sign({ id, email, fullName }, process.env.SECRET, { expiresIn: 60 * 60 });
}

module.exports = sign;