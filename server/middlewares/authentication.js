const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

async function authentication(request, response, next) {
    const token = request.headers.access_token;

    try {
        if(!token) {
            throw { name: 'AuthenticationFailed' }
        } else {
            const decoded = verifyToken(token);
            const user = await User.findOne({
                where: {
                    email: decoded.email
                }
            });
            if(!user) {
                throw { name: 'AuthenticationFailed' }
            } else {
                request.loggedInUser = decoded;
                next();
            }
        }
    } catch(error) {
        next(error);
    }
}

module.exports = authentication;