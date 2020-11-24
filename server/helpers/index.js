const {hashPassword, checkPassword} = require('./bcrypt')
const jwt = require('./jwt')


module.exports={
  hashPassword,
  checkPassword,
  jwt
}