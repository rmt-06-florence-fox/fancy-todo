const { User } = require("../models");
const { compare } = require("../helpers/password-bcrypt");
const { encode } = require("../helpers/jwt");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class UserController {
  static async register(req, res, next) {
    const obj = {
      email: req.body.email,
      password: req.body.password,
    };
    try {
      const data = await User.create(obj);
      res.status(201).json({ email: data.email, id: data.id });
    } catch (error) {
      next(error);
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
    } catch (error) {
      next(error);
    }
  }
  static googleLogin(req, res, next) {
    let payload;
    client
      .verifyIdToken({
        idToken: req.body.googleToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      })
      .then((ticket) => {
        payload = ticket.getPayload();
        return User.findOne({
          where: {
            email: payload.email,
          },
        })
          .then((user) => {
            if (user) {
              return user;
            } else {
              return User.create({
                email: payload.email,
                password: process.env.GOOGLE_PASSWORD,
              });
            }
          })
          .then((user) => {
            const access_token = encode({
              email: user.email,
              id: user.id,
            });
            res.status(200).json({ access_token });
          })
          .catch((err) => {
            next(err);
          });
      });
  }
}
module.exports = UserController;
