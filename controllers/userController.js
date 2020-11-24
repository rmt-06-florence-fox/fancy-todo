const Bcrypt = require('../helpers/bcryptjs');
const {User} = require('../models/index')

class UserController{
    static async signup(req, res){
        let newUser = {
            email: req.body.email,
            password: req.body.password,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        try {
            const data = await User.create(newUser)
            console.log(data);
            let dataShow = { id : data.id, email : data.email}
            res.status(201).json(dataShow)
        } catch (err) {
            res.status(400).json(err)
        }
    }

    static async signin(req, res){
        let dataLogin = {
            email : req.body.email,
            password : req.body.password
        }
        try {
            const data = await User.findOne({where : {email : dataLogin.email}})
            const accessToken = await Bcrypt.hashSync(dataLogin.password, data.password)
            res.status(200).json({accessToken})
        } catch (err) {
            res.status(300).json(err)
        }
    }
}

module.exports = UserController