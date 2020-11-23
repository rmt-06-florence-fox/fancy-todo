const { User } = require("../models")
const { comparePassword } = require("../helper/hashing_compare")
const jwt = require("jsonwebtoken")

class userController {
    static async registerPost (req, res) { //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< static
        const { full_name, email, password } = req.body
        const input = { full_name, email, password }
        try {
            const user = await User.create(input)
            res.status(201).json( { id: user.id, email: user.email } )
        } catch (error) {
            res.status(500).json( { error: error.message } )
        }
    }
    static async loginPost (req, res) { //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< static
        try {
            const user = await User.findOne({
                where: {
                    email: req.body.email
                }
            })
            if (!user) {
                res.status(500).json( { message: "invalid account" } )
            } else if (user && comparePassword(req.body.password, user.password)) {
                const token = jwt.sign({
                    id: user.id,
                    email: user.email,
                    full_name: user.full_name
                }, process.env.SECRET , { expiresIn: 60 * 30 })

                res.status(200).json({ token })
            } else {
                res.status(500).json( { message: "invalid account or password" } )
            }
        } catch (error) {
            res.status(500).json( { error: error.message } )
        }
    }
}

module.exports = userController
