const {User} = require('../models')
const {verifyToken} = require('../helpers/jwt')
module.exports = (req, res, next) => {
    let token = req.headers.accesstoken
    try {
      if (!token){
          throw {
              status : 401,
              message : "Please Log In"
          }
      } else {
            const decoded = verifyToken(token)
            if (!decoded) {
                throw{
                    status : 404,
                    message : "Data Not Found"
                }
            } else {
                req.activeUser = decoded
                const dataUser = User.findByPk(decoded.id)
                if (dataUser == null){
                    throw{
                        status : 404,
                        message : "Data Not Found"
                    }
                } else {
                    next()
                }  
            }
            
      }
    } catch (err) {
        next(err)
    }
}