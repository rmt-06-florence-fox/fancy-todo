const { User } = require("../models");
const { compare } = require("../helpers/password-bcrypt");
const { encode } = require("../helpers/jwt");

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
  static async login(req, res) {
    try {
      const data = await User.findOne({ where: { email: req.body.email } });
      if (!data) {
        res.status(404).json({ message: "Invalid account" });
      } else if (compare(req.body.password, data.password)) {
        const token = encode({
          id: data.id,
          email: data.email,
        });
        res.status(200).json({ access_token: token });
      } else {
        res.status(404).json({ message: "Invalid email/password" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = UserController;
