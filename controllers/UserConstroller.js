const { User } = require("../models")
const { comparePass } = require("../helper/generatePass")
const { generateToken } = require("../helper/generateToken")

class UserControllers {
    static signUp(req, res, next) {
        const signup = {
            email: req.body.email,
            password: req.body.password
        }
        
        User.create(signup)
            .then(data => {
                res.status(201).json({
                    id: data.id,
                    email: data.email
                })
            })
            .catch(err => {
                console.log(err)
                next(err)
            })
    }

    static signIn(req, res, next) {
        User.findOne({ where: { email: req.body.email }})
            .then(data => {
                if(!data) {
                    // tidak boleh memberikan spesifik error
                    throw {
                        status: 404,
                        msg: "DataNotFound"
                    }
                } else {
                    const access_token = generateToken({id: data.id, email: data.email})
                    if (comparePass(req.body.password, data.password)) {
                        res.status(200).json({access_token})                        
                    } else {
                        throw {
                            status: 401,
                            msg: "InvalidAccount"
                        }
                    }
                }
            })
            .catch(err => {
                console.log(err)
                next(err)
            })
    }
}

module.exports = UserControllers