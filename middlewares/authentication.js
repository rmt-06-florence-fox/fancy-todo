const { verify } = require('../helpers/jwt-token')
const { User } = require('../models/index')

module.exports = async (req, res, next) => {
    try {
        const access_token = req.headers.access_token
        if (!access_token) {
            throw {
                status: 401,
                message: 'Please login first!!'
            }
        } else {
            const decoded = verify(access_token)
            User.findOne({where: {id: decoded.id}})
            .then(data => {
                req.loggedInUser = decoded
                next()
            })
            .catch(err => {
                throw {
                    status: 401,
                    message: 'Invalid Account'
                }
            })
        }
    } catch (error) {
        if (error.status) {
            next(error)
        } else {
            next({
                status: 500,
                message: 'Internal Server Error'
            })
        }
    }
}