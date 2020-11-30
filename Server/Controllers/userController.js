const {User} = require('../models/index');
const {checkPassword} = require('../helpers/bcrypt');
const {generateToken} = require('../helpers/jsonwebtoken');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENTIDGOOGLE);


class Controller {
    static async register(req, res, next){
        const newUserInput = {
            email: req.body.email,
            password: req.body.password
        }
        try {
            const newUser = await User.create(newUserInput);
            res.status(201).json({id: newUser.id, email: newUser.email})
        } catch (error) {
            next(error);
        }
    }

    static async login(req, res, next){
        const loginAcc = {
            email: req.body.email,
            password: req.body.password
        }
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
                throw{
                    status: 401,
                    message: "Wrong Username / Password"
                }
            }
        } catch(error){
            next(error);
        }
        
    }

    static async googleLogin(req, res, next){
        try { 
            const ticket = await client.verifyIdToken({
            idToken: req.body.googleToken,
            audience: process.env.CLIENTIDGOOGLE,
            });
            const payload = ticket.getPayload();
            const loginAccount = await User.findOne({where: {email: payload.email}});
            if(loginAccount){
                const access_token = generateToken({id: loginAccount.id, email: loginAccount.email})
                res.status(200).json({access_token});
            } else {
                const newAccount = await User.create({
                    email: payload.email,
                    password: process.env.NEWACCPASS
                })
                const access_token = generateToken({id: newAccount.id, email: newAccount.email})
                res.status(200).json({access_token});
            }
        } catch(error){
            next(error);
        }

    }
}

module.exports = Controller;