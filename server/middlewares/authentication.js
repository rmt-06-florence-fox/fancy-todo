const { User } = require('../models')
const { verifyToken } = require('../helpers/jsonwebtoken')

module.exports = async (req, res, next) => {
  try {
    const { accesstoken } = req.headers
    if (!accesstoken) {
      throw {
        status: 401,
        message: 'Please login first'
      }
    }
    else {
      const decoded = verifyToken(accesstoken)
      // console.log(decoded)
      req.signedInUser = decoded
      const checkUser = await User.findOne({ where: { id: decoded.id } })
      if (checkUser) next()
      else {
        throw {
          status: 401,
          message: 'Please login first'
        }
      }
    }
  } catch (error) {
    next(error)
  }
}