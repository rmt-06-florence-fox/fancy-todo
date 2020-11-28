const { User } = require("../models")
const { comparePassword } = require("../helper/hashing_compare")
const { generateToken } = require("../helper/jwt")
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GID);

class userController {
    static async registerPost(req, res, next) { //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< static
        const { full_name, email, password } = req.body
        const input = { full_name, email, password }
        try {
            const user = await User.create(input)
            res.status(201).json({ id: user.id, email: user.email })
        } catch (err) {
            next(err)
        }
    }
    static async loginPost(req, res, next) { //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< static
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
    static googleLogin(req, res) {
        let payload;
        client.verifyIdToken({
            idToken: req.body.googleToken,
            audience: process.env.GID
        })
            .then(ticket => {
                payload = ticket.getPayload()
                console.log(payload);
                return User.findOne({
                    where: {
                        email: payload.email
                    }
                })
                    .then(user => {
                        console.log("masuk1");
                        if (user) {
                            return user
                        } else {
                            return User.create({
                                full_name: payload.name,
                                email: payload.email,
                                password: process.env.G_PASS
                            })
                        }
                    })
                    .then(user => {
                        console.log("masuk2");
                        const access_token = generateToken({ email: user.email, id: user.id, name: user.full_name })
                        res.status(200).json({ access_token })
                    })
            })
            .catch(err => {
                res.status(500).json({ msg: `Internal server error` })
            })
    }
}

module.exports = userController
