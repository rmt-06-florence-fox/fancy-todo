const {User} = require('../models/')

class UserController {
    
    static getRegisterForm(req, res){
        res.status(200).json('ini login form')
    }

    static register(req, res){
        
    }
}

module.exports = UserController

