const { User } = require("../models/index")
const comparePassword = require("../helpers/comparepassword")
const generateToken = require("../helpers/generateToken")
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class UserController {
  static async register(req, res, next){
    try {
      let payload = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      }
      const user = await User.create(payload)
      res.status(201).json(user)

    } catch (error) {
        next(error)
    }
  }

  static async login(req, res, next){
    try {
      const data = await User.findOne({
        where: {
          email: req.body.email
        }
      })
      if (!data){
        throw({
          status: 401,
          message: "Invalid email/password"
        })
      }
      else {
        if (comparePassword(req.body.password, data.password) === true){

          let access_token = generateToken({
            id: data.id,
            email: data.email
          }, process.env.SECRET_JWT)
          res.status(200).json({ access_token })
        }
        else {
          throw({
            status: 401,
            message: "Invalid email/password"
          })
        }
      }
    } catch (error) {
      next(error)
    }
  }

  static googleLogin(req, res, next){
    let payload;
    client.verifyIdToken({
      idToken: req.body.googleToken,
      audience: process.env.GOOGLE_CLIENT_ID
    })
    .then(ticket => {
      payload = ticket.getPayload()
      return User.findOne({
        where: {
          email: payload.email
        }
      })
    })
    .then(user => {
      if (user){
        return user
      }
      else {
        return User.create({
          email: payload.email,
          password: process.env.GOOGLE_USER_PASSWORD,
          first_name: payload.given_name,
          last_name: payload.family_name,
          username: payload.family_name
        })
      }
    })
    .then(user => {
      let access_token = generateToken({
        id: user.id,
        email: user.email
      }, process.env.SECRET_JWT)
      res.status(200).json({ access_token })
    })
    .catch(err => {
      next(err)
    })
  }
}


module.exports = UserController