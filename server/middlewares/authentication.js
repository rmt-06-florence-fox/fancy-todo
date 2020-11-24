const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.token
    if (!token) {
      res.status(401).json({
        message: `Please login first`
      })
    } else {
      const decoded = verifyToken(token)
      req.SignedIn = decoded
      console.log(req.SignedIn.id );
      const data = await User.findOne({where: {id: decoded.id}})
      if (data) {
        next()
      } else {
        res.status(404).json({
          message: `Please register account first`
        })
      }
    }
  } catch (error) {
    res.status(500).json(error)
  }
} 