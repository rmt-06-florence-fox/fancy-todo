const jwt = require('jsonwebtoken')

module.exports = {
  encode(user) {
    return jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email
      },
      process.env.JWT_SECRET
    )
  },
  decode(token) {
    return jwt.verify(token, process.env.JWT_SECRET)
  }
}

// const jwt = require('jsonwebtoken')

// const generateToken = (payload) => {
//   return jwt.sign(payload, 'rahasia')
// }

// const verifyToken = (token) => {
//   return jwt.verify(token, 'rahasia')
// }

// module.exports = {
//   generateToken, verifyToken
// }