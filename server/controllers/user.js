const {User} = require('../models')
const {comparePassword} = require('../helpers/bcrypt')
const {signToken} = require('../helpers/jwt')

class UserController {
  static async register (req, res, next) {
    try {
      const {email, password} = req.body
      const user = await User.create({email, password})
      res.status(201).json({id: user.id, email:user.email})
    } catch (error) {
     res.status(400).json(error)
    }
  }

  static async login (req, res, next) {
    try {
      const {email, password} = req.body
      const user = await User.findOne({where: {email}})

      if (!user) {
        throw {msg: 'username or password is incorrect'}
      } else if (!comparePassword(password, user.password)) {
        throw {msg: 'username or password is incorrect'}
      } else {
        const payload = {id:user.id, email:user.email}
        const token = signToken(payload)
        res.status(200).json({access_token: token})
      }
    } catch (error) {
      res.status(400).json(error)
    }
  }
}

module.exports = UserController