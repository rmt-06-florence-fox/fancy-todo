const jwt = require('jsonwebtoken')

const signToken = payload => {
  return access_token = jwt.sign(payload, process.env.SECRET)
}

const verifyToken = token => {
  return decoded = jwt.verify(token, process.env.SECRET)
}

module.exports = {signToken, verifyToken}
