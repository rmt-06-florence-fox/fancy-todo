const {Todo, User} = require('../models/index')
let nodemailer = require('nodemailer');
const { google } = require("googleapis");
class Controller {
    static async createTodo (req, res, next) {
        try {
            let todo = {
                title: req.body.title,
                description: req.body.description,
                status: req.body.status,
                due_date: req.body.due_date,
                UserId: req.userLoggedIn.id 
            }

            let data = await Todo.create(todo)
        //     let targetMail = req.userLoggedIn.email
        //     const OAuth2 = google.auth.OAuth2;
        //     const oauth2Client = new OAuth2(
        //         process.env.CLIENTID, // ClientID
        //         process.env.CLIENTSECRET, // Client Secret
        //         "https://developers.google.com/oauthplayground" // Redirect URL
        //     );   
        //     oauth2Client.setCredentials({
        //     refresh_token: process.env.REFRESHTOKEN
        //     });
        //     const accessToken = oauth2Client.getAccessToken()
        //     const smtpTransport = nodemailer.createTransport({
        //         service: "gmail",
        //         auth: {
        //              type: "OAuth2",
        //              user: "ask.untara@gmail.com", 
        //              clientId: process.env.CLIENTID,
        //              clientSecret: process.env.CLIENTSECRET,
        //              refreshToken: process.env.REFRESHTOKEN,
        //              accessToken: accessToken
        //         }
        //    });   
        //     let mailOptions = {
        //       from: 'ask.untara@gmail.com',
        //       to: `${targetMail}`,
        //       subject: 'Confirmation New ToDo',
        //       text: `your new todo: ${JSON.stringify(data)}`
        //     };
        //     smtpTransport.sendMail(mailOptions, (error, response) => {
        //         error ? console.log(error) : console.log(response);
        //         smtpTransport.close();
        //    });
                res.status(201).json(data)
        } catch (err) {
            next(err)
        }
    }
    static async getTodo(req, res, next) {
        try {
            let UserId = req.userLoggedIn.id 
            let data = await Todo.findAll({
                where : {
                    UserId
                },
                order: [
                    ['due_date']
                ]
            })
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({message: `internal server error`})            
        }
    }
    static async getTodoById(req, res, next){
        try {
            let id = req.params.id
            let data = await Todo.findByPk(id)
            if(!data){
                throw({
                    status: 404,
                    message: `error not found`
                })
                // res.status(404).json({message:`error not found`})
            } else {
                res.status(200).json(data)
            }
        } catch (err) {
            next(err)
        }
    }
    static async updateTodo(req, res, next){
        try {
            let id = req.params.id
            let data = await Todo.update({
                title: req.body.title,
                description: req.body.description,
                due_date: req.body.due_date
                }
                , {
                    where: {
                        id
                    },
                    returning: true,
            })
            console.log(data[1])
            if(!data[0]){
                throw({
                    status: 404,
                    message: `error not found`
                })
            } else {
                res.status(200).json(data[1][0])
    
            }
        } catch (err) {
            next(err)
        }
    }
    static async modifyStatusTodo(req, res, next){
        try {
            let id = req.params.id
            let newStatus = req.body.status
            let data = await Todo.update({status: newStatus}, {
                where: {
                    id
                },
                returning: true,
            })
            if(!data[0]){
                throw ({
                    status: 404,
                    message: `error not found`
                })
            } else {
                res.status(200).json(data[1][0])
            }
        } catch (error) {
            next (err)
        }
    }
    static async destroyTodo(req, res, next) {
        let id = req.params.id
        try {
            let data = await Todo.destroy({
                where: {
                    id
                },
                returning: true
            })
            if(!data){
                throw({
                    status: 404,
                    message: `error not found`
                })
            } else {
                console.log(data)
                res.status(200).json({message: `delete success`})
            }
        } catch (err) {
            next(err)
        }
    }
    static async completedTodo(req, res, next){
        try {
            let UserId = req.userLoggedIn.id 
            let data = await Todo.findAll({
                where: {
                    UserId,
                    status: 'completed'
                },
                order: [
                    ['due_date']
                ]
            })
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
    static async unfinishedTodo(req, res, next){
        try {
            let UserId = req.userLoggedIn.id 
            let data = await Todo.findAll({
                where: {
                    UserId,
                    status: 'unfinished'
                },
                order: [
                    ['due_date']
                ]
            })
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller