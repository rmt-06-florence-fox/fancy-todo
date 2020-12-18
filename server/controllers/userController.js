const { User } = require("../models/index")
const bcrypt = require('bcryptjs');
const { generateToken } = require("../helpers/generateAndVerifyToken")
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

class ControllerUser {
    static addDataUser(req, res, next) {
        let objUser = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        }
        User.create(objUser)
            .then(data => {
                res.status(201).json({ name: data.firstName, email: data.email })
            })
            .catch(err => {
                next(err)
            })
    }

    static loginUser(req, res, next) {
        let email = req.body.email
        let password = req.body.password
        User.findOne({
            where: {
                email
            }
        })
            .then(data => {
                if(!data) {
                    throw {
                        status: 400,
                        message: "Invalid email/password",
                      }
                }else {
                    let passwordInDataBase = data.password
                    if(bcrypt.compareSync(password, passwordInDataBase)) {
                        const accesToken = generateToken({ fullName: data.fullName(), id: data.id, email: data.email }) // change generate token using helper
                        res.status(200).json({accesToken})
                    }else {
                        throw {
                            status: 401,
                            message: "Invalid email/password",
                          }
                    }
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static loginWithGoogle(req, res, next) {
        let tmpPayload = null
        client.verifyIdToken({
            idToken: req.body.googleToken,
            audience: process.env.CLIENT_ID, 
        })
            .then((ticket) => {
                let payload = ticket.getPayload();
                tmpPayload = payload 
                let email = payload.email
                return User.findOne({
                            where: {
                                email
                            }
                })
            })
            .then(user => {
                if(user) {
                    return user
                } else {
                    // console.log(tmpPayload)
                    return User.create({
                        firstName: tmpPayload.given_name,
                        lastName: tmpPayload.family_name,
                        email: tmpPayload.email,
                        password: process.env.GOOGLE_SECRET
                    })
                }
            }) 
            .then(user => {       
                const acces_token = generateToken({ email: user.email, id: user.id, fullName: user.fullName()})
                res.status(200).json({acces_token})
            })

            .catch(err => {
                console.log(err)
                next(err)
            })
    }
}

module.exports = ControllerUser