const {User} = require('../models')

class UserController {
  static async register (req, res, next) {
    try {
      const {email, password} = req.body
      console.log("🚀 ~ file: user.js ~ line 7 ~ UserController ~ register ~ req.body", req.body)
      const newUser = await User.create({email, password})
      res.status(201).json({newUser})
    } catch (error) {
     console.log("🚀 ~ file: user.js ~ line 10 ~ UserController ~ register ~ error", error)
     res.status(400).json(error)
    }
  }

  static async login (req, res, next) {
    try {
      const {email, password} = req.body
      const user = await User.findOne({where: {email}})

      if (user) {
        //
      }
    } catch (error) {
      
    }
  }
}

module.exports = UserController