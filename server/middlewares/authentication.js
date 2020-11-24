const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

async function authentication(request, response, next) {
    const { token } = request.headers;
    //const token = verifyToken(request.headers.access_token)

    try {
        if(!token) {
            console.log("Token not Found");
            response.status(404).json({ message:"Token not Found" })
            //throw { name: 'AuthenticationFailed' }
        } else {
            const decoded = verifyToken(token);
            const user = await User.findOne({
                where: {
                    email: decoded.email
                }
            });
            if(!user) {
                console.log("User not Found");
                response.status(404).json({ message:"User not Found" })
                //throw { name: 'AuthenticationFailed' }
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