const { User } = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class UserController {
    static register(req, res) {
        let userObject = {
            email : req.body.email,
            password : req.body.password
        }

        User.create(userObject)
        .then((data) => {
            res.status(201).json({email : data.email, password : data.password})
        }).catch((err) => {
            console.log(err);
            res.status(500).json({message : 'Internal Server Error'})
            
        });
    }

    static login(req, res) {
        User.findOne({where : {email : req.body.email}})
        .then(data => {
            if (!data) {
                res.status(404).json({message : 'Account not found'})  
            } else {
                if (bcrypt.compareSync(req.body.password, data.password)) {
                    const access_token = jwt.sign({id : data.id, email : data.email}, 'bidadaricantik')
                    res.status(200).json({ access_token }) 
                } else {
                    res.status(401).json({message : 'Invalid password or email'})
                }
                
            }
        })
    }
}

module.exports = UserController