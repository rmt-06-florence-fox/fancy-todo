const { User } = require("../models");
const { compare } = require("../helpers/passwordHandler");
const { generateToken } = require("../helpers/tokenHandler");
class UserController {
  static async register(req, res) {
    try {
      const payload = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      };
      const data = await User.create(payload);
      res.status(201).json(data);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        res.status(400).json(error.message);
      } else {
        res.status(500).json({ msg: "Internal Server Error" });
      }
    }
  }

  static async login(req, res) {
    User.findOne({
      where: {
        email: req.body.email,
      },
    })
      .then((data) => {
        if (!data) {
          res.status(401).json({ msg: "Invalid account" });
        } else if (compare(req.body.password, data.password)) {
          const access_token = generateToken({
            id: data.id,
            email: data.email,
          });
          res.status(200).json({ access_token });
        } else {
          res.status(401).json({ msg: "Invalid email/password" });
        }
      })
      .catch((err) => {
        res.status(500).json({ msg: "internal server error" });
      });
  }
}

module.exports = UserController;
