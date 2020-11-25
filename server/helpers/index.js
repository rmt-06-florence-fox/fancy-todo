const {hashPassword, comparePassword} = require('./bcrypt')
const { generateToken, verifyToken } = require('./jwt')


module.exports = {
    hashPassword,
    comparePassword,
    generateToken,
    verifyToken
}