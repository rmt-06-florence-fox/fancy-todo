const { User } = require("../models")

const { verifyToken } = require("../helper/generateToken")

module.exports = async (req, res, next) => {
    const { access_token } = req.headers

    try {
        if (!access_token) {
            res.status(401).json({message: "Login First"})
        } else {
            const decoded = verifyToken(req.headers.access_token)
            // console.log(decoded)
            req.logInUser = decoded
            const user = await User.findOne({where: {id: decoded.id}})
            // console.log(user)
            if (user) {
                next()
            } else {
                res.status(401).json({message: "Login First"})
            }
        }    
    } catch (error) {
        // console.log(err)
        res.status(500).json({msg: "err"})
    }
}