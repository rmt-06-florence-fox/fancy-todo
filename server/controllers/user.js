const { User } = require("../models/index")
const comparePassword = require("../helpers/comparepassword")
const generateToken = require("../helpers/generateToken")

class UserController {
  static async register(req, res){
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
        if(error.name === "SequelizeUniqueConstraintError" || error.name === "SequelizeValidationError"){
          let errors = []
          for (let i = 0; i < error.errors.length; i++){
            errors.push(error.errors[i].message)
          }
          res.status(400).json({message: errors})
        }
        else {
          res.status(500).json({message: "Invalid Server Error"})
        }
    }
  }

  static async login(req, res){
    try {
      const data = await User.findOne({
        where: {
          email: req.body.email
        }
      })
      if (!data){
        res.status(401).json({message: "Invalid email/password"})
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
          res.status(401).json({message: "Invalid email/password"})
        }
      }
    } catch (error) {
      console.group(error.message)
      res.status(500).json({message: "Invalid Server Error"})
    }
  }
}


module.exports = UserController