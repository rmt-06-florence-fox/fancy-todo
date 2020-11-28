const {User} = require('../models')
const {verifyToken} = require('../helpers/jwt')
module.exports = (req, res, next) => {
    let token = req.headers.accesstoken
    console.log(token);
    try {
      if (!token){
          throw {
              status : 401,
              msg : "Please Log In"
          }
      } else {
            const decoded = verifyToken(token)
            if (!decoded) {
                throw{
                    status : 404,
                    msg : "Data Not Found"
                }
            } else {
                req.activeUser = decoded
                const dataUser = User.findByPk(decoded.id)
                if (dataUser == null){
                    throw{
                        status : 404,
                        msg : "Data Not Found"
                    }
                } else {
                    next()
                }  
            }
            
      }
    } catch (err) {
        console.log(err);
    }
}