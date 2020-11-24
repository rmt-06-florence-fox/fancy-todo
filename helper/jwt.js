const jwt = require('jsonwebtoken')


function getToken(data,secretKey){
    let token = jwt.sign({data},secretKey)
    return token
}


module.exports = {getToken}


