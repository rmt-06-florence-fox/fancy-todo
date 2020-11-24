const jwt = require('jsonwebtoken')

function generateToken(value) {
  return jwt.sign(value, process.env.SECRET)
}

function verifyToken(token) {
  return jwt.verify(token, process.env.SECRET)
}

module.exports = { generateToken, verifyToken }