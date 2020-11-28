const { User } = require('../models/index')
const { comparePassword } = require('../helpers/password')
const { signToken } = require('../helpers/jwt')
const axios = require('axios')
const {OAuth2Client} = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)


class UserController {
    static async register(req,res,next){

        const newUser = {
            email: req.body.email,
            password: req.body.password
        }
        try {
            const data = await User.create(newUser)
            res.status(200).json({id: data.id, email: data.email})
        } catch (error) {
            next(error)
        }
    }

    static async login(req,res,next){
        try {
            const data = await User.findOne({
                where: {
                    email: req.body.email,
                }
            })
            if(!data){
                throw {
                    status: 404,
                    message: 'Invalid Account'
                }
            }else{
                if(comparePassword(req.body.password, data.password)){
                    const access_token = signToken({id: data.id, email: data.email}, 'SECRET')
                    res.status(200).json({access_token})
                }else{
                    throw {
                        status: 404,
                        message: 'Invalid Account / Password'
                    }
                }
            }
        } catch (error) {
            next(error)
        }
    }

    static async googlelogin(req,res,next){

        try {
            const ticket = await client.verifyIdToken({
                idToken: req.body.googletoken,
                audience: process.env.GOOGLE_CLIENT_ID
            })
            const payload = ticket.getPayload()
            const isDataExist = await User.findOne({
                where:{
                    email: payload.email
                }
            })
            if(isDataExist){
                const access_token = signToken({id: isDataExist.id, email: isDataExist.email})
                res.status(200).json({access_token})
            } else {
                const newData = await User.create({
                    email: payload.email,
                    password: process.env.PASSWORD
                })
                const access_token = signToken({id: newData.id, email: newData.email}, 'SECRET')
                res.status(200).json({access_token})
            }
        } catch (error) {
            next(error)
        }
    }

    static async kucing(req, res){

        axios({
            url: "https://api.thecatapi.com/v1/images/search",
            method: "GET",
            headers: {
                "x-api-key": "a6e5d737-a3fb-45b6-bec7-123f2779c615"
            }
        })
        .then(response => {
            console.log(response.data)
            res.status(200).json({data : response.data})
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
    }
}


module.exports = UserController