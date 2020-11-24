const verifyToken = require("../helpers/verifyToken")
const { User } = require("../models")

function authenticateUser(req, res, next){
  try {
    const { access_token } = req.headers

    if(!access_token){
      res.status(401).json({
        message: "Please log in first"
      })
    }
    else {
      const decoded = verifyToken(access_token)
      User.findOne({
        where: {
          id: decoded.id,
          email: decoded.email
        }
      })
        .then(user => {
          if(user){
            req.loggedInUser = decoded
            next()
          }
          else {
            res.status(401).json({
              message: "Please log in first"
            })
          }
        })
    }
  } catch (error) {
      console.log(error.message)
      res.status(401).json({
        message: "Please log in first"
      })
  }
}

module.exports = authenticateUser