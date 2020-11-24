const { User } = require("../models");
const { compare } = require("../helper/bcrypt");
const sign = require("../helper/jwt");

class UserController {
    static register(req, res) {
        const userObj = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password
        }
        User.create(userObj)
            .then((data) => {
                res.status(201).json({ id: data.id, email: data.email });
            })
            .catch((err) => {
                if (err.name === "SequelizeValidationError") {
                    let errors = [];
                    let messages = [];
                    for (let i = 0; i < err.errors.length; i++) {
                        if(!errors.includes(err.errors[i].message)) {
                            errors.push(err.errors[i].message);
                            messages.push({ message: err.errors[i].message });
                        }
                    }
                    res.status(400).json(messages);
                } else {
                    res.status(500).json({ message: "Internal Server Error" });
                }
            })
    }
    
    static login(req, res) {
        User.findOne({
            where: {
                email: req.body.email
            }
        })
            .then((data) => {
                if(!data) {
                    res.status(401).json({ message: "Account is invalid." });
                } else if (compare(req.body.password, data.password)) {
                        const access_token = sign(data.id, data.email, data.getFullName());
                        res.status(200).json({ access_token });
                } else {
                    res.status(401).json({ message: "Email or password is invalid."});
                }
            })
            .catch((err) => {
                res.status(500).json({ message: "Internal Server Error" });
            });
    }
}

module.exports = UserController;