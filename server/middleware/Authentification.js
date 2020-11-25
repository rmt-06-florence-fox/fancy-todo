const { verifyToken } = require("jsonwebtoken");
const UserController = require("../controller/usersController");
const { User } = require('../models')


module.exports = async (req, res, next) => {
try {
    console.log("bypass midlleware");
    const { access_token } = req.headers
    console.log(req.headers);
    console.log(access_token);
    
    if (!access_token) {
        res.status(401).json({message : "Please login first"}) 
    } else {
        const decoded = verifyToken(access_token)
        console.log(decoded);
        req.loggedInUser = decoded
        const user = await User.findOne( {
            where : {
                id: decoded.id
            }
        })
        if (user) {
            next()
        }
        
    }
    
    } catch (error) {
        console.log(error);
        res.status(401).json({ message : "Unauthorized"})
        
    }

    
}