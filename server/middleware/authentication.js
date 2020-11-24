const {User} = require('../models')
const {makeDecode} = require('../helper/jwt') 

module.exports = async (req,res,next) => {
  try {
    if (req.headers.access_token) {
      const {access_token} = req.headers
      const decoded = makeDecode(access_token)
      const findUser = await User.findOne({where : {id : decoded.id}})
      req.userLogin = decoded
      if (findUser) {
        next()
      } else {
        res.status(401).json({message : `you can't get in, you must login first`})
      }
    } else {
      res.status(401).json({message : `you can't get in, you must login first`})
    }
  } catch (error) {
    res.status(500).json(error)
  }
}