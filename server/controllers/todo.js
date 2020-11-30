const { Todo } = require('../models')

const axios = require('axios');

class TodosController {

  static create(req, res, next) {
    const payload = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date,
      UserId: req.userData.id
    }
    Todo.create(payload)
    .then(data => {
      res.status(201).json(data)
    })
    .catch(err => {
      next(err)
    })
  }

  static read(req, res, next) {
    Todo.findAll({
      where: {
        UserId: req.userData.id
      }
    })
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      next(err)
    })
  }

  static findOne(req, res, next) {
    const id = req.params.id
    Todo.findByPk(id)
    .then(data => {
      if(data) {
        res.status(200).json(data)
      } else {
        next({name: "ErrorNotFound"})
      }      
    })
    .catch(err => {
      next(err)
    })
  }

  static update(req, res, next) {
    const id = Number(req.params.id)

    const payload = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date
    }

    Todo.update(payload, {
      where: {
        id
      }
    })
    .then(data => {
      if(data[0] != 0) {
        res.status(200).json(payload)   
      } else {
        next({name: "ErrorNotFound"})
      }
    })
    .catch(err => {
      next(err)
    })
  }

  static editStatus(req, res, next) {
    const id = req.params.id
    const payload = {
      status: req.body.status
    }

    Todo.update(payload, {
      where: {
        id
      },
      returning: true
    })
    .then(data => {
      if(data != 0){
        res.status(200).json(data)
      } else {
        next({name: "ErrorNotFound"})
      }
    })
    .catch(err => {
      next(err)
    })
  }

  static delete(req, res, next) {
    const id = Number(req.params.id)

    Todo.destroy({
      where: {
        id
      }
    })
    .then(data => {
      if(data != 0) {
        res.status(200).json({message: 'Delete Success'})
      } else {
        next({name: "ErrorNotFound"})
      }
    })
    .catch(err => {
      next(err)
    })
  }

  static getNews(req, res, next) {
    axios({
      url: `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`,
      method: "GET"
    })
    .then(response => {
      const payload = {
        title: response.data.articles[0].title,
        description: response.data.articles[0].description,
        imageUrl: response.data.articles[0].urlToImage,
        publishedAt: response.data.articles[0].publishedAt,
        url: response.data.articles[0].url 
      }
      res.json(payload)
    })
    .catch(err => {
      console.log(err)
      next(err)
    })
  }

}

module.exports = TodosController