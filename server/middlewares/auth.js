const { degenToken } = require ('../helpers/helper')
const { User } = require('../models/index');

module.exports = async (req, res, next) => {
    
    if (req.headers.access_token) {
        const userData = degenToken(req.headers.access_token)
        console.log(userData)
        const user = User.findOne ({
                        where: {
                            id: userData.id
                        }
                    })
        
        if (user) {
            req.loggedUser = userData
            next ()
        }
    } else {
        res.status(500).json({message: `Need login to access`})
    }
}