const {User} = require("../models")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

class UserControllers {
    static signUp(req, res) {
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
                res.status(500).json({
                    message: "internal service error"
                })
            })
    }

    static signIn(req, res) {
        User.findOne({ where: { email: req.body.email }})
            .then(data => {
                if(!data) {
                    // tidak boleh memberikan spesifik error
                    res.status(404).json({message: "Invalid account"})
                } else {
                    const access_token = jwt.sign({id: data.id, email: data.password}, process.env.SECRET)
                    if (bcrypt.compareSync(req.body.password, data.password)) {
                        res.status(200).json({access_token})                        
                    } else {
                        res.status(401).json({message: "invalid email/password"})
                    }
                }
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({message: "internal service error"})
            })
    }
}

module.exports = UserControllers