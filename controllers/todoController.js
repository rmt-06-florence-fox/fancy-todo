const {Todo, User} = require('../models/index')
let nodemailer = require('nodemailer');
const { google } = require("googleapis");
class Controller {
    static async createTodo (req, res) {
        try {
            let todo = {
                title: req.body.title,
                description: req.body.description,
                status: req.body.status,
                due_date: req.body.due_date,
                UserId: req.userLoggedIn.id 
            }
            let currentDate = new Date()
            if(new Date(req.body.due_date) < currentDate){
                res.status(400).json({message: `tanggal tidak boleh diisi tanggal sebelumnya`})
            } else {
                let data = await Todo.create(todo)
                let targetMail = req.userLoggedIn.email
                console.log(targetMail)
                const OAuth2 = google.auth.OAuth2;
                const oauth2Client = new OAuth2(
                    "888944489978-93a3kk2q3c9spi82hob9dc1lf2eu7gca.apps.googleusercontent.com", // ClientID
                    "nw7vNSXUEtVPIiHvT8QV63E-", // Client Secret
                    "https://developers.google.com/oauthplayground" // Redirect URL
                );
    
                oauth2Client.setCredentials({
                refresh_token: "1//04A3ocbLuv5syCgYIARAAGAQSNwF-L9IrOnCHJkpmo8AjFp93VQtTFkAy852zS5CzZvv_YWKBH89Qq0pA6Y5N-D9tnBihy-V_HBI"
                });
                const accessToken = oauth2Client.getAccessToken()
                const smtpTransport = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                         type: "OAuth2",
                         user: "ask.untara@gmail.com", 
                         clientId: "888944489978-93a3kk2q3c9spi82hob9dc1lf2eu7gca.apps.googleusercontent.com",
                         clientSecret: "nw7vNSXUEtVPIiHvT8QV63E-",
                         refreshToken: "1//04A3ocbLuv5syCgYIARAAGAQSNwF-L9IrOnCHJkpmo8AjFp93VQtTFkAy852zS5CzZvv_YWKBH89Qq0pA6Y5N-D9tnBihy-V_HBI",
                         accessToken: accessToken
                    }
               });
    
                let mailOptions = {
                  from: 'ask.untara@gmail.com',
                  to: `${targetMail}`,
                  subject: 'Confirmation New ToDo',
                  text: `your new todo: ${JSON.stringify(data)}`
                };
                smtpTransport.sendMail(mailOptions, (error, response) => {
                    error ? console.log(error) : console.log(response);
                    smtpTransport.close();
               });
                res.status(201).json(data)
            }
        } catch (error) {
            res.status(500).json({message: `internal server error`})
        }
    }
    static async getTodo(req, res) {
        try {
            let data = await Todo.findAll()
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({message: `internal server error`})            
        }
    }
    static async getTodoById(req, res){
        try {
            let id = req.params.id
            let data = await Todo.findByPk(id)
            console.log(data)
            if(!data){
                res.status(404).json({message:`error not found`})
            } else {
                res.status(200).json(data)
            }
        } catch (error) {
            res.status(500).json({message: `internal server error`})
        }
    }
    static async updateTodo(req, res){
        try {
            let id = req.params.id
            let obj = {
                title: req.body.title,
                description: req.body.description,
                status: req.body.status,
                due_date: req.body.due_date
            }
            let data = await Todo.update(obj, {
                where: {
                    id
                },
                returning: true,
            })
            if(!data[0]){
                res.status(404).json({message: `error not found`})
            } else {
                let currentDate = new Date()
                if(new Date(req.body.due_date) < currentDate){
                    res.status(400).json({message: `tanggal tidak boleh diisi tanggal sebelumnya`})
                } else {
                    res.status(200).json(data[1][0])
                }
            }
        } catch (error) {
            res.status(500).json({message: `internal server error`})
        }
    }
    static async modifyStatusTodo(req, res){
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
                res.status(404).json({message: `error not found`})
            } else {
                if(!newStatus){
                    res.status(400).json({message: `status tidak boleh kosong`})
                } else {
                    res.status(200).json(data[1][0])
                }
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }
    static async destroyTodo(req, res) {
        let id = req.params.id
        try {
            let data = await Todo.destroy({
                where: {
                    id
                },
                returning: true
            })
            if(!data){
                res.status(404).json({message: `error not found`})
            } else {
                res.status(200).json(data[1][0])
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = Controller