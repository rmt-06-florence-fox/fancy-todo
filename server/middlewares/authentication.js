const {verifyToken} = require('../helpers/jwt')
const {User} = require('../models')

const authentication = async (req, res, next) => {
  const {access_token} = req.headers
  try {
    if (!access_token) {
      throw {name: 'Authentication failed'}
    } else {
      const decoded = verifyToken(access_token)
      const user = await User.findOne({where: {email: decoded.email}})
      
      if (!user) {
        throw {name: 'Authentication failed'}
      } else {
        req.loggedInUser = decoded
        next()
      }
    }
  } catch (error) {
    console.log("🚀 ~ file: authentication.js ~ line 22 ~ authentication ~ error", error)
    next(error) 
  }
}

module.exports = authentication