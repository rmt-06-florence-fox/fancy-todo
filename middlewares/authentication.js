const { User } = require("../models")
const { verifyToken } = require("../helper/jwt")

module.exports = async (req, res, next) => {
    try {
        console.log("test udah masuk auth");
        const { token } = req.headers
        if (!token) {
            res.status(401).json({ message: "Please Login or Register First1"})
        } else {
            const decode = verifyToken(token)
            req.loggedInUser = decode
            const user = await User.findOne({ where: { 
                id: decode.id
            }})
            if (user) {
                next()
            } else {
                res.status(401).json({ message: "Please Login or Register First"})
            }
        }
    } catch (error) {
        res.status(401).json({ message: "Please Login or Register First2"})
    }
}