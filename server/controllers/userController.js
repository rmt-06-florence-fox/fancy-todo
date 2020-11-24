const { User } = require("../models/index")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // dont forget require if will use jwt
require('dotenv').config(); // dont forget require dotenv

class ControllerUser {
    static addDataUser(req, res) {
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
                res.status(500).json(err)
            })
    }

    static loginUser(req, res) {
        let email = req.body.email
        let password = req.body.password
        User.findOne({
            where: {
                email
            }
        })
            .then(data => {
                // console.log(data)
                if(!data) {
                    res.status(401).json({ message: "Invalid email/password" })
                }else {
                    let passwordInDataBase = data.password
                    if(bcrypt.compareSync(password, passwordInDataBase)) {
                        // console.log("=====================================")
                        const accesToken = jwt.sign({ fullName: data.fullName(), id: data.id, email: data.email }, process.env.SECRET)
                        // console.log(accesToken, "<----------------")
                        res.status(200).json({accesToken})
                    }else {
                        res.status(401).json({ message: "Invalid email/password" })
                    }
                }
            })
            .catch(err => {
                res.status(401).json({ message : "Internal Service Error"})
            })
    }
}

module.exports = ControllerUser