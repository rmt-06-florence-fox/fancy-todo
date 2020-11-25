const { User } = require('../models')
const {comparePassword} = require('../helpers/bcrypt')
const jwt = require('jsonwebtoken');
const { generateToken } = require('../helpers/jwt');

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

    static login(req, res, next) {
        console.log(req);
        User.findOne({where : {email : req.body.email}})
        
        .then(data => {
            console.log(data);
            if (!data) {
                res.status(404).json({message : 'Account not found'})  
            } else if (comparePassword(req.body.password, data.password)) {
                const access_token = generateToken({id : data.id, email : data.email})
                res.status(200).json({ access_token })


            } else {
                res.status(401).json({message : 'Invalid password or email'})
                    }
            // else {
            //     if (bcrypt.compareSync(req.body.password, data.password)) {
            //         res.status(200).json({ access_token })
            //     } else {
            //         res.status(401).json({message : 'Invalid password or email'})
            //     }
                
            // }
        })
        .catch(err => {
            res.status(500).json({message : 'Internal Server Error'})
        })
    }
}

module.exports = UserController