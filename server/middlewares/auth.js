const { degenToken } = require ('../helpers/helper')
const { User } = require('../models/index');

module.exports = async (req, res, next) => {
    try {
        if (req.headers.access_token) {
            const userData = await degenToken(req.headers.access_token)
            console.log(userData)
            const user = User.findOne ({
                            where: {
                                id: userData.id
                            }
                        })
            
            if (user) {
                req.loggedUser = userData
                next ()
            }
        } else {
            throw {status: 400, message: `Need login to access`}
        }
    } catch (err) {
        next(err)
    }
 
}