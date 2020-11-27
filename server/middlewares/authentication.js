require('dotenv').config();
const jwt = require('jsonwebtoken');
module.exports = async (req, res, next) => {
    const token = req.headers.token
    if (!token) {
        res.status(400).json(`you must login first`)
    }else{
        try {
            const decoded = await jwt.verify(token, process.env.secret);
            if (decoded) {
                console.log(decoded, '<<<<<<');
                req.loginUser = decoded
                next()
            }else{
                // res.status(400).json({msg: `your session is time up`})
                throw {
                    status: 401,
                    message: `your session is time up`
                }
            }
        } catch (error) {
            // res.status(500).json({msg: `Any Problem from server`})
            next(error)
        }
    }
}