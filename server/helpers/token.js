const jwt = require('jsonwebtoken')

function signToken(payload){
  const access_token = jwt.sign(payload, process.env.SECRET);
  return access_token
}

function verifyToken(access_token){
  const decoded = jwt.verify(access_token, process.env.SECRET);
 return decoded
}

module.exports = {signToken, verifyToken}