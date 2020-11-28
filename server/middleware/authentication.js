const helper = require('../helpers/helper.js')
const { User } = require('../../models')

module.exports = async (req, res, next) => {
  try {
    const { access_token } = req.headers
    if (access_token) {
      const decoded = helper.verifyToken(access_token)
      req.login = decoded
      const user = await User.findOne({
        where: {
          id: decoded.id
        }
      })
      if (user) {
        next()
      } else {
        throw {
          status: 401,
          message: 'Please login first !'
        }
      }
    } else {
      throw {
        status: 401,
        message: 'Please login first !'
      }
    }
  }
  catch (err) {
    next(err)
  }
}