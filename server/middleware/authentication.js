const {User} = require('../models/')
const {verifyToken} = require('../helpers/token')

module.exports = async (req, res, next ) => {
  try {
    const {access_token} = req.headers
  if(!access_token) {
    // res.status(401).json({error: "user is not logged in"})
    throw{
      status: 401,
      message: "user is not logged in"
    }
  } else {
    const decoded = verifyToken(access_token)

    const user = await User.findOne({
      where: {
        id: decoded.id
      }
    })

    if(!user){
      // res.status(401).json({
      //   error: "authentication failed"
      // })
      throw{
        status: 401,
        message: "authentication failed"
      }
    } else {
      req.currentUser = decoded
      next()
    }
  }
  } catch (err) {
    next(err);
    // res.status(401).json({
    //   error: "login first "
    // })
    
  }
}