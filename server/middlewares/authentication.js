const Helper = require('../helpers/helper.js')
const { User } = require('../models')

async function authentication (req, res, next) {
  const access_token = req.headers.access_token
  try {
    if (access_token) {
      const decoded = Helper.verifyToken(access_token)
      // console.log(decoded, '<-- dari decoded authentication')
      const user = await User.findOne({
        where: {
          email: decoded.email
        }
      })
      if (user) {
        // console.log(user, '<-- user dari authentication')
        req.loggedUser = decoded
        next()
      } else {
        throw {
          status: 401,
          message: `Please login first !`
        }
      }
    } else {
      throw {
        status: 401,
        message: `Please login first !`
      }
    }
  }
  catch (err) {
    next (err)
  }
}

module.exports = authentication