const TodoController = require('./todoController')
const UserController = require('./userController')
const axios = require('axios')
require('dotenv').config()

class Controller{
  static async getQuotes(req, res, next){
    try{
      console.log('--- Get Quotes ---');
      const gatcha = Math.ceil(Math.random()*100)
      const quotes = await axios({
        url: `https://quote-garden.herokuapp.com/api/v2/quotes?page=${gatcha}&limit=3`,
        method: "GET"
      })
      res.status(200).json({result: quotes.data})
    }catch(err){
      next(err)
    }
  }
  static async getRestaurants(req, res, next){
    try{
      console.log('--- Get Restaurants ---');
      const data = await axios({
        url: `https://developers.zomato.com/api/v2.1/search?collection_id=306459&sort=rating`,
        method: 'GET',
        headers:{
          'user-key': process.env.ZOMATO_key
        }
      })
      console.log(data.data, '<<< terbaru');
      res.status(200).json({data: data.data.restaurants})
    }catch(err){
      next(err)
    }
  }
}

module.exports = {
  Controller,
  TodoController,
  UserController
};