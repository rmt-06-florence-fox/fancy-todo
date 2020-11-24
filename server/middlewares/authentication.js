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
      console.log(decoded);
      // const data = await User.findOne({where: {id: decoded.id}})
      // console.log(data);
      // next()
    }
  } catch (error) {
    res.status(500).json(error)
  }
} 