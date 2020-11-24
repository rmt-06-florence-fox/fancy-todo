const { User } = require("../models");
const { compare } = require("../helpers/bcryptHelpers");
const { encode } = require("../helpers/tokenHelpers");

class UserController {
  static postRegister(req, res, next) {
    User.create({
      email: req.body.email,
      password: req.body.password,
    })
      .then((data) => {
        res.status(201).json({ email: data.email, id: data.id });
      })
      .catch((err) => {
        next(err);
      });
  }

  static postLogin(req, res, next) {
    User.findOne({ where: { email: req.body.email } })
      .then((data) => {
        if (!data) {
          throw {
            status: 401,
            message: "Invalid Account",
          };
        } else if (compare(req.body.password, data.password)) {
          const access_token = encode(data);
          res.status(200).json({ access_token });
        } else {
          throw {
            status: 401,
            message: "Invalid email/password",
          };
        }
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = UserController;
