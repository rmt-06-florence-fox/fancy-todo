const jwt = require('jsonwebtoken')

function signToken(payload){
  const access_token = jwt.sign(payload, 'shhhhh');
  return access_token
}

function verifyToken(access_token){
  const decoded = jwt.verify(access_token, 'shhhhh');
 return decoded
}

module.exports = {signToken, verifyToken}