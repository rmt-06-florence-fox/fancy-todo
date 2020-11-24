const { User } = require("../models/index")
const comparePassword = require("../helpers/comparepassword")
const generateToken = require("../helpers/generateToken")

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
          }, process.env.SECRET)
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
}


module.exports = UserController