const jwt = require('jsonwebtoken')


function getToken(payload){
    console.log(process.env.SECRET)
    let token = jwt.sign({payload},process.env.SECRET)
    return token
}

function decodedToken(token){
    const decoded = jwt.verify(token,process.env.SECRET)
    return decoded
}

module.exports = {
    getToken,
    decodedToken
}


