const { User } = require("../models");
const { compare } = require("../helpers/passwordHandler");
const { generateToken } = require("../helpers/tokenHandler");
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)
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
      console.log(error)
      next(error)
    }
  }

  //login
  static login(req, res, next) {
    let whichObj = {}
    if (req.body.email) {
      whichObj.email = req.body.email
    } else if (req.body.username) {
      whichObj.username = req.body.username
    }
    User.findOne({
      where: whichObj,
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

  //gsignin
  static async loginGoogle(req, res, next) {
    try {
      const ticket = await client.verifyIdToken({
        idToken: req.body.googleToken,
        audience: process.env.CLIENT_ID
      })
      const payload = ticket.getPayload();
      console.log(payload)
      const user = await User.findOne({
        where: {
          email: payload.email
        }
      })
      if (!user) {
        const gUser = await User.create({
          username: `${payload.given_name}${payload.family_name}`,
          email: payload.email,
          password: process.env.PASSWORD
        })
        const access_token = generateToken({
          id: gUser.id,
          email: gUser.email,
        });
        res.status(200).json({ access_token })
      } else {
        const access_token = generateToken({
          id: user.id,
          email: user.email,
        });
        res.status(200).json({ access_token })
      }
    } catch (err) {
      console.log(err)
      next(err)
    }
  }
}

module.exports = UserController;
