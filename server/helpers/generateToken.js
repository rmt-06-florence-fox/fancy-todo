const jwt = require('jsonwebtoken')

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.SECRET
  )
}

module.exports = { generateToken }