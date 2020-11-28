const { verifyToken } = require('../helpers/jwt');
const { User } = require('../models')


module.exports = async (req, res, next) => {
try {
    const { access_token } = req.headers

    if (!access_token) {
        throw ({errorDesc: 'Unauthorized'})
    } else {
        const decoded = verifyToken(access_token)
        req.loggedInUser = decoded
        const user = await User.findOne( {
            where : {
                id: decoded.id
            }
        })
        if (user) {
            next()
        }else {
            throw {
                errorDesc : 'AuthenticationFailed'
            }
        }
    }
    } catch (error) {
        next(error)
    }
}

