const TodoController = require('./todoController')
const UserController = require('./userController')
const axios = require('axios')

class Controller{
  static async getQuotes(req, res){
    try{
      console.log('--- Get Quotes ---');
      const quotes = await axios({
        url: 'https://quote-garden.herokuapp.com/api/v2/quotes?page=1&limit=10',
        method: "GET"
      })
      res.status(200).json({result: quotes.data})
    }catch(err){
      res.status(500).json(err)
    }
  }
}

module.exports = {
  Controller,
  TodoController,
  UserController
};