const { User } = require('../models')
const {comparePassword} = require('../helpers/bcrypt')
const jwt = require('jsonwebtoken');
const { generateToken } = require('../helpers/jwt');
const verifiyGoogle = require('../helpers/verifiyGoogleToken')

class UserController {
    static register(req, res, next) {
        let userObject = {
            email: req.body.email,
            password: req.body.password
        }
        User.create(userObject)
            .then(data => {
                if(!data || !data.email || !data.password) {
                throw{
                    errrorDesc : 'InvalidEmailorPassword'
                }
            } else {
                res.status(201).json({email: data.email, id: data.id})
            }
        })
            .catch(err => next(err))
    }

    static login(req, res, next) {
        User.findOne({where : {email : req.body.email}})
        
        .then(data => {
            console.log(data);
            if (!data) {
                throw{
                    errorDesc: 'NotFound' 
                }
            } else if (comparePassword(req.body.password, data.password)) {
                const access_token = generateToken({id : data.id, email : data.email})
                res.status(200).json({ access_token })
            } else {
                throw {
                    errorDesc : 'InvalidEmailorPassword'
                }
            }
        })
        .catch(err => next(err))
    }


    static show(req, res, next) {
        User.findAll()
            .then(user => res.status(200).json(user))
            .catch(err => next(err))
    }

    static async googleLogin(req, res, next) {
        const google_token = req.headers.google_token

        try {
            const payload = await verifiyGoogle(google_token)
            const email = payload.email
            const user = await User.findOne({
                where: {
                    email
                }
            })
            const password = process.env.DEFAULT_GOOGLE_PASSWORD
            if(user) {
                let check = bcrypt.compareSync(password, user.password)
                if(check) {
                    const token = jwt.sign({id: user.id, email: user.email, }, process.env.SECRET)
                    res.status(200).json({user, token})
                } else {
                    
                }
            } else {
                const newUser = await User.create({
                    email,
                    password
                })
                const token = jwt.sign({id: newUser.id, email: newUser.email, }, process.env.SECRET)
                res.status(200).json({token})
                
            }
        } catch(err) {
            next(err)
        }
    }
}

module.exports = UserController