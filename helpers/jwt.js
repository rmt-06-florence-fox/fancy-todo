const jwt = require('jsonwebtoken')

function createToken(data){
    const token_access = jwt.sign(data, process.env.secret)
    return token_access
}

function verifyToken(token){
    const decode = jwt.verify(token, process.env.secret)
    return decode
}

module.exports={
    createToken,
    verifyToken
}