const jwt = require('jsonwebtoken')
require('dotenv').config()
const secret = process.env.SECRET

const authentication = (req, res, next) => {
  const { access_token } = req.headers

  if(!access_token) {
    next({name: 'AccessDenied'})
  }
  try {
    const decoded = jwt.verify(access_token, secret)
    req.userData = decoded
    next()
  } 
  catch(err) {
    next({name: 'AuthenticationFailed'})
  }
}

module.exports = authentication