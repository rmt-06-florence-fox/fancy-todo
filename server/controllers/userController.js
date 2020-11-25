const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { loginToken } = require("../helpers/jwt");
const { OAuth2Client } = require('google-auth-library');

class userController{
    static async register(request, response, next) {
        try{
            const payload = {
                email: request.body.email,
                password: request.body.password
            }
            if(payload.email === '' || payload.password === '') {
                throw { name: '' }
            } else {
                const user = await User.create(payload);
                response.status(201).json({
                    id: user.id,
                    email: user.email
                })
            }
        } catch(error) {
            next(error);
        }
    }

    static async login(request, response, next) {
        try{
            const payload = {
                email: request.body.email,
                password: request.body.password
            }
            if(payload.email === '' || payload.password === '') {
                throw { name: '' }
            } else {
                const user = await User.findOne({ where: { email: payload.email } });
                if(!user) {
                    throw { name: "InvalidEmailorPassword" }
                } else if(!comparePassword(payload.password, user.password)) {
                    throw { name: "InvalidEmailorPassword" }
                } else {
                    const access_token = loginToken({
                        id: user.id,
                        email: user.email
                    });
                    response.status(200).json({ access_token });
                }
            }
        } catch(error) {
            next(error);
        }
    }

    static async glogin(request, response, next) {
        let { g_access_token } = request.body
        const client = new OAuth2Client(process.env.OAuthID);
        let email = null;

        client.verifyIdToken({
            idToken: g_access_token,
            audience: process.env.OAuthID
        })
        .then(ticket=> {
            let payload = ticket.getPayload();
            email = payload.email;

            return User.findOne({
                where: { email: payload.email }
            })
        })
        .then(user => {
            if(user) {
                return user
            } else {
                let userData = {
                    email, password: "12345"
                }

                return User.create(userData);
            }
        })
        .then(ticket => {
			let access_token = loginToken({
				id: ticket.id,
				email: ticket.email
			})

			return response.status(200).json({
				access_token,
				email
			})
		})
        .catch(error => {
            console.log(error);
        })
    }
}

module.exports = userController;