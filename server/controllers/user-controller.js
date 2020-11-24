const { User } = require("../models");
const { compare } = require("../helpers/bcryptHelpers");
const { encode } = require("../helpers/tokenHelpers");

class UserController {
  static postRegister(req, res) {
    User.create({
      email: req.body.email,
      password: req.body.password,
    })
      .then((data) => {
        res.status(201).json({ email: data.email, id: data.id });
      })
      .catch((err) => {
        res.status(500).json({ message: "Internal Server Error" });
      });
  }

  static postLogin(req, res) {
    User.findOne({ where: { email: req.body.email } })
      .then((data) => {
        if (!data) {
          res.status(401).json({ message: "Invalid Account" });
        } else if (compare(req.body.password, data.password)) {
          const access_token = encode(data);
          res.status(200).json({ access_token });
        } else {
          res.status(401).json({ message: "Invalid email/password" });
        }
      })
      .catch((err) => {
        res.status(500).json({ message: "Internal Server Error" });
      });
  }
}

module.exports = UserController;
