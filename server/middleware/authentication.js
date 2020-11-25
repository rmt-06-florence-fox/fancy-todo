const {User} = require('../models')
const {makeDecode} = require('../helper/jwt') 

module.exports = async (req,res,next) => {
  try {
    if (req.headers.access_token) {
      const {access_token} = req.headers
      const decoded = makeDecode(access_token)
      const findUser = await User.findOne({where : {id : decoded.id}})
      req.userLogin = decoded
      if (findUser) {
        next()
      } else {
        throw {
          status : 401,
          message: `you can't get in, you must login first`
        }
      }
    } else {
      throw {
        status : 401,
        message: `you can't get in, you must login first`
      }
    }
  } catch (error) {
    next(error)
  }
}