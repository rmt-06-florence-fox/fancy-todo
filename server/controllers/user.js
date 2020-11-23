const { User } = require('../models')

class UserController {
    static async login (req, res){
        try {
            res.status(200).json('ok')
            
        } catch (error) {
            res.status(500).json(error)
            
        }

    } 
    static async register(req, res){

        try {
            res.status(200).json('ok')
            
        } catch (error) {
            res.status(500).json(error)
        }
    }
}


module.exports = UserController