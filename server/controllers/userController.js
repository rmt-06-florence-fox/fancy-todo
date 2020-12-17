const Helper = require('../helpers/helper.js');
const { User } = require('../models')

class UserController {
  static register (req, res, next) {
    let payload = {
      email: req.body.email,
      password: req.body.password
    }
    User.create(payload)
    .then(data => {
      res.status(201).json({
        id: data.id,
        email: data.email
      })
    })
    .catch(err => {
      next(err)
    })
  }

  static login (req, res, next) {
    User.findOne({
      where: {
        email: req.body.email
      }
    })
    .then(data => {
      if (data) {
        const access_token = Helper.createToken({
          id: data.id,
          email: data.email
        })
        res.status(200).json({ access_token })
      } else {
        throw {
          status: 401,
          message: `Invalid Email / Password !`
        }
      }
    })
    .catch(err => {
      // console.log(err, '<-- dari login')
      next(err)
    })
  }
  
}

module.exports = UserController