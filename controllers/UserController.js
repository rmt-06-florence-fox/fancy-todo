const { User } = require('../models/index.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../helpers/jwt.js');

class UserController {
    static register(req,res) {
        let userObj = {
            email: req.body.email,
            password: req.body.password
        }
        User.create(userObj)
        .then(data => {
            res.status(201).json({email: data.email, id: data.id});
        })
        .catch(err => {
            //console.log(err)
            res.status(500).json({message: 'internal server error'});
        })
    }

    static login(req,res) {
        User.findOne({where: {email: req.body.email}})
        .then(data => {
            if(!data) {
                res.status(401).json({message: 'invalid account'})
            }
            else {
                if (bcrypt.compareSync(req.body.password, data.password)) {
                    const access_token = generateToken({id: data.id, email: data.email});
                    res.status(200).json({access_token});
                }
                else {
                    res.status(401).json({message: 'invalid email/password'})
                }
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: 'internal server errorrrr'});
        })
    }
}

module.exports = UserController;
