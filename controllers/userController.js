const { User } = require("../models")
const { comparePassword } = require("../helper/hashing_compare")
const { generateToken } = require("../helper/jwt")

class userController {
    static async registerPost (req, res, next) { //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< static
        const { full_name, email, password } = req.body
        const input = { full_name, email, password }
        try {
            const user = await User.create(input)
            res.status(201).json( { id: user.id, email: user.email } )
        } catch (err) {
            next(err)
        }
    }
    static async loginPost (req, res, next) { //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< static
        try {
            const user = await User.findOne({
                where: {
                    email: req.body.email
                }
            })
            if (!user) {
                throw {
                    status: 400,
                    message: "invalid account or password"
                }
            } else if (user && comparePassword(req.body.password, user.password)) {
                const payload = {
                    id: user.id,
                    email: user.email,
                    full_name: user.full_name
                }
                const access_token = generateToken(payload)
                res.status(200).json({ access_token })
            } else {
                throw {
                    status: 400,
                    message: "invalid account or password"
                }
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = userController
