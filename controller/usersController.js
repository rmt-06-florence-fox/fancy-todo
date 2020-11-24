const { User } = require('../models')

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
}

module.exports = UserController