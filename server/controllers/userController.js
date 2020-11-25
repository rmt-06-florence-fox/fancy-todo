const Bcrypt = require('../helpers/bcryptjs');
const { generateToken } = require('../helpers/jwt');
const {User} = require('../models/index')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLECLIENTID);

class UserController{
    static async signup(req, res, next){
        let newUser = {
            email: req.body.email,
            password: req.body.password
        }
        try {
            const data = await User.create(newUser)
            let dataShow = { id : data.id, email : data.email}
            res.status(201).json(dataShow)
        } catch (err) {
            next(err)
        }
    }

    static async signin(req, res, next){
        let dataLogin = {
            email : req.body.email,
            password : req.body.password
        }
        try {
            const data = await User.findOne({where : {email : dataLogin.email}})
            const accessToken = await generateToken({id : data.id, email : data.email})
            res.status(200).json({accessToken})
        } catch (err) {
            next(err)
        }
    }

    static async google(req, res, next) {
        try {
           const ticket = await client.verifyIdToken({
                idToken: req.body.tokenGoogle,
                audience: process.env.GOOGLECLIENTID,
            });
            const payload = ticket.getPayload();
            const userid = payload['sub']; 
            console.log(userid, '< userid');
            console.log(payload, '< payload');
        } catch (err) {
            res.status(500).json(err)
        }
        
    }
    //   verify().catch(console.error);
    // }
}

module.exports = UserController