const { User } = require('../models')
const {createToken, verifyToken} = require('../helper/jwt')
const  {comparePw, generatePw}  = require('../helper/password')

class UserController{
    static addUser(req, res, next){
        const payload = {
            name: req.body.name,
            email: req.body.email,
            password: generatePw(req.body.password)
        }
        User.create(payload)
            .then(data => {
                res.status(201).json({id: data.id, email: data.email})
            })
            .catch(err => {
                next(err)
                // res.status(400).json(err.errors)
            })
    }

    static logIn(req, res, next){
        User.findOne({where: {email : req.body.email}})
            .then(data => {
                console.log(data);
                if (!data){
                    throw{
                        status: 401,
                        message: 'Invalid account'
                    }
                    // res.status(401).json({msg : 'Invalid account'})
                } else if (comparePw(req.body.password, data.password)){
                    // console.log(comparePw(req.body.password, data.password),'<<<');
                    const access_token = createToken({id: data.id, email: data.email})
                    res.status(200).json({access_token})
                } else {
                    throw{
                        status: 401,
                        message: 'Invalid email/password'
                    }
                    // res.status(401).json({msg: 'Invalid email/password'})
                }
            })
            .catch(err => {
                next(err)
                // res.status(400).json(err.errors)
            })
    }
}

module.exports = UserController