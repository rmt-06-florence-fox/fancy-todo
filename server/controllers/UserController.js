const { User } = require("../models");
const { compare } = require("../helpers/passwordHandler");
const { generateToken } = require("../helpers/tokenHandler");
class UserController {

  //create
  static async register(req, res, next) {
    try {
      const payload = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      };
      const data = await User.create(payload);
      res.status(201).json(data);
    } catch (error) {
      next(error)
    }
  }

  //login
  static login(req, res, next) {
    User.findOne({
      where: {
        email: req.body.email
      },
    })
      .then((data) => {
        if (!data) {
          throw {
            status: 401,
            message: "Account not found!"
          }
        } else if (compare(req.body.password, data.password)) {
          const access_token = generateToken({
            id: data.id,
            email: data.email,
          });
          res.status(200).json({ access_token });
        } else {
          throw {
            status: 401,
            message: "Invalid email/password"
          }
        }
      })
      .catch((err) => {
        next(err)
      });
  }
}

module.exports = UserController;
