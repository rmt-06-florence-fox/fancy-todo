const { User } = require('../models')
const { verifyToken } = require('../helpers/jsonwebtoken')

module.exports = async (req, res, next) => {
  try {
    const { accesstoken } = req.headers
    if (!accesstoken) {
      res.status(401).json({ message: 'Please login first' })
    }
    else {
      const decoded = verifyToken(accesstoken)
      // console.log(decoded)
      req.signedInUser = decoded
      const checkUser = await User.findOne({ where: { id: decoded.id } })
      if (checkUser) next()
      else res.status(401).json({ message: 'Please login first' })
    }
  } catch (error) {
    console.log(error)
    res.status(401).json({ message: 'Please login first' })
  }
}