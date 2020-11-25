const { User } = require("../models/index")
const bcrypt = require('bcryptjs');
const { generateToken } = require("../helpers/generateAndVerifyToken")

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
                if(!data) {
                    res.status(401).json({ message: "Invalid email/password" })
                }else {
                    let passwordInDataBase = data.password
                    if(bcrypt.compareSync(password, passwordInDataBase)) {
                        const accesToken = generateToken({ fullName: data.fullName(), id: data.id, email: data.email }) // change generate token using helper
                        res.status(200).json({accesToken})
                    }else {
                        res.status(401).json({ message: "Invalid email/password" })
                    }
                }
            })
            .catch(err => {
                res.status(500).json({ message : "Internal Server Error"})
                // console.log(err)
            })
    }
}

module.exports = ControllerUser