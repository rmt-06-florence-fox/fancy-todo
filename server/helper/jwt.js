const jwt = require('jsonwebtoken')


function getToken(payload){
    console.log('========= GET TOKEN========')
    console.log(process.env.SECRET)
    let token = jwt.sign({payload},process.env.SECRET)
    return token
}

async function decodedToken(token){
    try {
        const decoded = await jwt.verify(token,process.env.SECRET)
        return decoded
    }catch {
        throw {
            status : 401,
            message : 'please Login'
        }
    }

}

module.exports = {
    getToken,
    decodedToken
}


