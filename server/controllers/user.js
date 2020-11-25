const {User} = require("../models/")
const {comparePassword} = require('../helpers/bcrypt')
const {generateToken} = require('../helpers/jwt')

class UserController {
    static register(req, res, next) {
        const newUser = {
            email: req.body.email,
            password: req.body.password
        }
        User.create(newUser)
            .then(data => {
                if(!data || !data.email || !data.password) {
                    throw{
                        status: 400,
                        message: 'Semua Field Tidak Boleh Kosong'
                    }
                } else {
                    res.status(201).json({email: data.email, id: data.id})
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static login(req, res, next) {
        User.findOne({
            where: {
                email: req.body.email
            }
        })
            .then(data => {
                if(!data) {
                    throw {
                        status: 400,
                        message: 'Invalid account'
                    }
                } else if(comparePassword(req.body.password, data.password)) {
                        const accesstoken = generateToken({id: data.id, email: data.email})
                        res.status(200).json({accesstoken})
                } else {
                    throw {
                        status: 400,
                        message: 'Invalid email/password'
                    }
                }
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = UserController