const jwt = require('jsonwebtoken')

function generateToken(payload){
  return jwt.sign(payload, "CocaColaZero")
}

function verifyToken(token){
  return jwt.verify(token, "CocaColaZero")
  
}

module.exports={
  generateToken,
  verifyToken
}