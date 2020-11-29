const { User } = require("../models");
const { compare } = require("../helpers/passwordHandler");
const { generateToken, verifyToken } = require("../helpers/tokenHandler");
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
  static loginGoogle(req, res, next) {
    // Verify Token
    // Dapetin Token dari Client
    let {google_access_token} = req.body;
    const client = new OAuth2Client(process.env.CLIENT_ID);
    let email = '';
    // Verify Google Token Berdasarkan Client ID
    client.verifyIdToken({
      idToken: google_access_token,
      audience: process.env.CLIENT_ID,
    })
    .then((ticket) => {
      let payload = ticket.getPayload();
      email = payload.email;
      return User.findOne({where: {email: payload.email}});
    })
    .then((user) => {
      if (user) {
        return user;
      } else {
        var userObj = {
          email,
          password: process.env.PASSWORD
        }
        return User.create(userObj);
      }
    })
    .then((dataUser) => {
      let access_token = signToken({id: dataUser.id, email: dataUser.email});
      return res.status(200).json({access_token});
    })
    .catch((err) => {
      next(err);
    });
  }
}

module.exports = UserController;
