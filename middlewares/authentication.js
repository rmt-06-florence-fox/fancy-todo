const jwt = require('jsonwebtoken')


function authentication (req, res, next){

    try {
        
        const access_token = req.headers.access_token
        if(!access_token){
            res.status(401).json({message: `You haven't login yet`})
        } else {
            const decoded = jwt.verify(access_token, 'SECRET')
            console.log(decoded)
            next()
        }
        
    } catch (error) {
        console.log(err)
        res.status(401).json({message: `You need to login first`})
    }    
}

module.exports = authentication