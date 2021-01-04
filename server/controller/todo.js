const {Todo} = require('../models')
const axios = require('axios')

class TodoController{
  static async show(req,res,next){
    try {
      const list = await Todo.findAll({where : {UserId : req.userLogin.id}, order: [['due_date', 'ASC']]})
      if (list) {
        res.status(200).json(list)
      } else {
        throw {
          status : 404,
          message: `error not found`
        }
      }
    } catch (error) {
      next(error)
    }
  }

  static async news(req,res, next){
    try {
      const news = await axios({
        url: `https://newsapi.org/v2/top-headlines?country=id&apiKey=${process.env.newsSECRET}`,
        method : 'GET'
      })
      res.status(200).json(news.data)
    } catch (error) {
      next(error)
    }
  }

  static async weather(req,res,next){
    let obj = {city : req.body.city}
    try {
      if (obj.city[0] !== obj.city[0].toUpperCase()) {
        throw {
          status : 400,
          message: `Must Capitalize on first letter`
        }
      } else {
        const weather = await axios({
          url: `http://api.weatherstack.com/current?access_key=${process.env.weatherSECRET}&query=${obj.city}`,
          method : 'GET'
        })
        if (weather.data.success === false) {
          throw {
            status : 404,
            message: `error not found`
          }
        } else {
          res.status(200).json(weather.data)
        }
      }
    } catch (error) {
      next(error)
    }
  }

  static async create(req,res,next){
    let obj = {
      title : req.body.title || '',
      description : req.body.description || '',
      status : false,
      due_date : req.body.due_date || '',
      UserId : req.userLogin.id
    }
    console.log(obj);
    try {
      const data = await Todo.create(obj)
      res.status(201).json(data)
    } catch (error) {
      next(error)
    }
  }

  static async seeList(req,res,next){
    let id = req.params.id
    try {
      const list = await Todo.findOne({where: {id}})
      if (list) {
        res.status(200).json(list)
      } else {
        throw {
          status : 404,
          message: `error not found`
        }
      }
    } catch (error) {
      next(error)
    }
  }

  static async update(req,res,next){
    let id = req.params.id
    let obj = {
      title : req.body.title,
      description : req.body.description,
      status : false,
      due_date : req.body.due_date
    }
    try {
      const data = await Todo.update(obj,{where : {id}, returning: true})
      if (data) {
        res.status(200).json(data[1][0])
      } else {
        throw {
          status : 404,
          message: `error not found`
        }
      }
    } catch (error) {
      next(error)
    }
  }

  static async patch(req,res,next){
    let id = req.params.id
    let obj = {
      status : true
    }
    try {
      const data = await Todo.update({status : obj.status},{where : {id}, returning: true})
      if (data) {
        res.status(200).json(data[1][0])
      } else {
        throw {
          status : 404,
          message: `error not found`
        }
      }
    } catch (error) {
      next(error)
    }
  }

  static async delete(req,res,next){
    let id = req.params.id
    try {
      const list = await Todo.destroy({where: {id}})
      if (list) {
        res.status(200).json({message :`todo success to delete`})
      } else {
        throw {
          status : 404,
          message: `error not found`
        }
      }
    } catch (error) {
      next(error)
    }
  }

}

module.exports = TodoController