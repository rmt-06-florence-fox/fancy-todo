const { User } = require("../models");
const { compare } = require("../helpers/password-bcrypt");
const { encode } = require("../helpers/jwt");

class UserController {
  static async register(req, res, next) {
    const obj = {
      email: req.body.email,
      password: req.body.password,
    };
    try {
      const data = await User.create(obj);
      res.status(201).json({ email: data.email, id: data.id });
    } catch (err) {
      next(err);
    }
  }
  static async login(req, res, next) {
    try {
      const data = await User.findOne({ where: { email: req.body.email } });
      if (!data) {
        throw {
          status: 400,
          message: "Invalid account",
        };
      } else if (compare(req.body.password, data.password)) {
        const token = encode({
          id: data.id,
          email: data.email,
        });
        res.status(200).json({ access_token: token });
      } else {
        throw {
          status: 400,
          message: "Invalid email/password",
        };
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
