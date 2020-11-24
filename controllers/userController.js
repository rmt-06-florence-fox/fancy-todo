
const {User} = require('../models')
const jwt = require('jsonwebtoken')
const {getToken} = require('../helper/jwt')
const checker = require('../helper/bcrypt')

class UserController {

static registerForm(req, res){
    let newUser = {
        email: req.body.email,
        password: req.body.password
    }
    User.create(newUser)
    .then(data =>{
        res.status(201).json({id: data.id, email:data.email})
    })
    .catch(err =>{
        res.status(400).json({errors })
    })

}
static loginForm(req, res){

    User.findOne({where : {email: req.body.email}})
    .then(data =>{
        if(!data){
            res.status(401).json({message: 'Invalid Account'})
        } else {
            if(checker(req.body.password, data.password)){
                let token_access = getToken({id: data.id, email: data.email})
                // let getToken = jwt.sign(, process.env.SECRET)
                res.status(200).json({token_access})
            } else {
                res.status(401).json({message: 'invalid email / password'})
            }
        }
    })
    .catch(err =>{
        res.status(500).json({message: 'Invalid Server Error'})
    })
}

}

module.exports = UserController