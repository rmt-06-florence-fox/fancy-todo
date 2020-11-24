const {User} = require("../models/")
const {comparePassword} = require('../helpers/bcrypt')
const {generateToken} = require('../helpers/jwt')

class UserController {
    static register(req, res) {
        const newUser = {
            email: req.body.email,
            password: req.body.password
        } 
        User.create(newUser)
            .then(data => {
                if(!data || !data.email || !data.password) {
                res.status(400).json({message: 'Semua Field Tidak Boleh Kosong'})
                } else {
                    res.status(201).json({email: data.email, id: data.id})
                }
            })
            .catch(err => {
                if(!newUser) {
                    res.status(400).json({message: 'Semua Field Tidak Boleh Kosong'})
                } else if(!newUser.email) {
                    res.status(400).json({message: 'Field Email Tidak Boleh Kosong'})
                } else if(!newUser.password) {
                    res.status(400).json({message: 'Field Password Tidak Boleh Kosong'})
                } else {
                    const errors = []
                    for(let i = 0; i < err.errors.length; i++) {
                        errors.push({
                            message: err.errors[i].message
                        })
                    }
                    res.status(400).json(errors)
                }
            })
    }

    static login(req, res) {
        User.findOne({
            where: {
                email: req.body.email
            }
        })
            .then(data => {
                if(!data) {
                    res.status(400).json({message: 'Invalid account'})
                } else if(comparePassword(req.body.password, data.password)) {
                        const accesstoken = generateToken({id: data.id, email: data.email})
                        res.status(200).json({accesstoken})
                } else {
                    res.status(400).json({message: 'Invalid email/password'})
                }
            })
            .catch(err => {
                res.status(500).json({message: 'Internal Server Error'})
            })
    }
}

module.exports = UserController