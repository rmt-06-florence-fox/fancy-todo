const {hashPassword, checkPassword} = require('./bcrypt')
const {generateToken, verifyToken} = require('./jwt')



module.exports={
  hashPassword,
  checkPassword,
  generateToken,
  verifyToken
}