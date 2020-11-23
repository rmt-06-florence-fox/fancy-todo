const { User } = require("../models");
const { hash, compare } = require("../helpers/password-bcrypt");

class UserController {
  static async register(req, res) {
    const obj = {
      email: req.body.email,
      password: req.body.password,
    };
    try {
      const data = await User.create(obj);
      res.status(201).json({ email: data.email, id: data.id });
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async login(req, res) {}
}

module.exports = UserController;
