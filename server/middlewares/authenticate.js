const { User } = require("../models")
const { verifyToken } = require("../helper/generateToken")

module.exports = async (req, res, next) => {
    const { access_token } = req.headers
    if (!access_token) {
        next({
            name: "Login First"
        })
    } else {
        const decoded = verifyToken(access_token)
        req.logInUser = decoded
        User.findOne({
            where: {
                id: decoded.id
            }
        })
            .then(user => {
                if(user) {
                    next()
                } else {
                    next({
                        name: "Invalid Account"
                    })
                }
            })
            .catch(err => {
                next(err)
            })
    }
    // try {
    //     if (!access_token) {
    //         throw {
    //             status: 401,
    //             msg: "Login First"
    //         }
    //         // res.status(401).json({message: "Login First"})
    //     } else {
    //         const decoded = verifyToken(req.headers.access_token)
    //         // console.log(decoded)
    //         req.logInUser = decoded
    //         const user = await User.findOne({where: {id: decoded.id}})
    //         // console.log(user)
    //         if (user) {
    //             next()
    //         } else {
    //             throw {
    //                 status: 401,
    //                 msg: "Login First"
    //             }
    //             // res.status(401).json({message: "Login First"})
    //         }
    //     }    
    // } catch (err) {
    //     // console.log(err)
    //     next(err)
    //     // res.status(500).json({msg: "err"})
    // }
}