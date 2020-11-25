const { User } = require('../models');
const { verifyToken } = require('../helpers/jwt.js');

module.exports = async (req,res,next) => {
    try {
        const {access_token} = req.headers
        if (!access_token) {
            // res.status(401).json({
            //     message: 'please login'
            // })
            throw {
                status: 401,
                message: 'please login'
            }
        } else {
            const decoded = verifyToken(access_token);
            //console.log(decoded);
            req.loggedInUser = decoded;
            const user = await User.findOne({
                where: {
                    id: decoded.id
                }
            })
            if (user) {
                next();
            } else {
                throw {
                    status: 401,
                    message: 'user not exist'
                }
            }
        }
    } catch (err) {
        //console.log(err);
        next(err)
    }
}