const TodoController = require('./todoController')
const UserController = require('./userController')
const axios = require('axios')
require('dotenv').config()

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
  static async getRestaurants(req, res){
    try{
      console.log('--- Get Restaurants ---');
      const dataRestaurants = await axios({
        url:'https://developers.zomato.com/api/v2.1/collections?city_id=74',
        method: 'GET',
        params:{
          'city_id': 74
        },
        headers:{
          'user-key': process.env.ZOMATO_key
        }
      })
      console.log(dataRestaurants);
      res.status(200).json({result: dataRestaurants.data.collections})
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