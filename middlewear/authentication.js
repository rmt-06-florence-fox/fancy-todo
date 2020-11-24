const {User} = require('../models')
const {verifyToken} = require('../helpers/jwt')
module.exports = (req, res, next) => {
    let token = req.headers.accesstoken
    try {
      if (!token){
          throw {
              status : 401,
              msg : "Please Log In"
          }
      } else {
            const decoded = verifyToken(token) //masih salah
            console.log(decoded);
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
    } catch (err) {
        console.log(err);
    }
}