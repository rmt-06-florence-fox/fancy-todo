const { verifyToken } = require ('../helpers/jwt.js')
const { User } = require ("../models/index")

module.exports = async (req, res, next) => {
    try {
            const {token} = req.headers
            if (!token) {
                throw {
                    status : 401,
                    msg : "Please Login First"
                }
            } else {
                const decoded = verifyToken (token)
                req.dataUser = decoded
                const user = await User.findOne ({ 
                    where : {
                        id : decoded.id
                    }
                })
                if (user) {
                    next()
                } else {
                    throw {
                        status : 401,
                        msg : "Please Login First"
                    }
                }
            }
        } catch (error) {
            next (error)
        }
    
}