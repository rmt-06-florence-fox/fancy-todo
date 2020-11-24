const jwt = require("jsonwebtoken")

function generateToken(payload, secretKey){
  return jwt.sign(payload, secretKey);
}

module.exports = generateToken