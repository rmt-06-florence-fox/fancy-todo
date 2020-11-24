const {User} = require('../models/index');
const {checkPassword} = require('../helpers/bcrypt');
const {generateToken} = require('../helpers/jsonwebtoken');

class Controller {
    static async register(req, res){
        const newUserInput = {
            email: req.body.email,
            password: req.body.password
        }
        try {
            const newUser = await User.create(newUserInput);
            res.status(201).json({id: newUser.id, email: newUser.email})
        } catch (error) {
            res.status(400).json(error)
        }
    }

    static async login(req, res){
        const loginAcc = {
            email: req.body.email,
            password: req.body.password
        }
        console.log(loginAcc);
        try{
            const loginAccount = await User.findOne({where: {email: loginAcc.email}})
            if(loginAccount && checkPassword(loginAcc.password, loginAccount.password)){
                const payload = {
                    id: loginAccount.id,
                    email: loginAccount.email
                }
                const access_token = generateToken(payload);
                res.status(200).json({access_token});
            } else {
                throw new Error('Wrong Username / Password')
            }
        } catch(error){
            res.status(400).json({error: error.message})
        }
        
    }
}

module.exports = Controller;