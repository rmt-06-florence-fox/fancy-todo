const { Todo } = require('../models')
const axios = require('axios')

class TodoController {
  static async createTodos(req, res) {
    try {
      const newData = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        dueDate: req.body.dueDate,
        UserId: req.signedInUser.id
      }
      const dataTodo = await Todo.create(newData)
      res.status(201).json(dataTodo)
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        res.status(400).json(error.errors[0].message)
      } else {
        res.status(500).json({ message: 'Internal server error' })
      }
    }
  }

  static async readTodos(req, res) {
    try {
      const dataTodo = await Todo.findAll()
      res.status(200).json(dataTodo)
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  static async readTodosById(req,res) {
    try {
      const findId = req.params.id
      const dataTodo = await Todo.findByPk(findId)
      if (dataTodo) res.status(200).json(dataTodo)
      else throw error
    } catch (error) {
      res.status(404).json('Error not found')
    }
  }

  static editTodosByRow(req, res) {
    const findId = req.params.id
    const editData = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      dueDate: req.body.dueDate
    }
    Todo.findByPk(findId)
      .then(todoData => {
        if (!todoData) res.status(404).json({ message: 'Error not found' })
        else return Todo.update(editData, { where: { id: findId }, returning: true })
      })
      .then(editedData => res.status(200).json(editedData[1][0]))
      .catch(error => {
        if (error.name === 'SequelizeValidationError') {
          const errors = error.errors.map(e => { return e.message })
          res.status(400).json(errors)
        } else {
          res.status(500).json({ message: 'Internal server error' })
        }
      })
  }

  static editTodosByColumn(req, res) {
    const findId = req.params.id
    const editData = { status: req.body.status }
    Todo.findByPk(findId)
      .then(todoData => {
        if (!todoData) res.status(404).json({ message: 'Error not found' })
        else return Todo.update(editData, { where: { id: findId }, returning: true })
      })
      .then(editedData => res.status(200).json(editedData[1][0]))
      .catch(error => {
        if (error.name === 'SequelizeValidationError') {
          const errors = error.errors.map(e => { return e.message })
          res.status(400).json(errors)
        } else {
          res.status(500).json({ message: 'Internal server error' })
        }
      })
  }

  static deleteTodos(req, res) {
    const findId = req.params.id
    Todo.findByPk(findId)
      .then(todoData => {
        if (!todoData) res.status(404).json({ message: 'Error not found' })
        else return Todo.destroy({ where: { id: findId }})
      })
      .then(() => res.status(200).json({ message: 'Todo success to delete' }))
      .catch(err => res.status(500).json({ message: 'Internal server error' }))
  }

  static playSongs(req, res) {
    // console.log('bisa')
    axios({
      url: `https://api.musixmatch.com/ws/1.1/track.search?q_artist=arctic monkeys&page_size=15&page=1&s_track_rating=desc&apikey=${process.env.APIKEY}`,
      method: 'GET',
      params: {
        q_artist: 'arctic monkeys',
        page_size: 15,
        page: 1,
        s_track_rating: 'desc',
        apikey: process.env.APIKEY
      }
    })
      .then(data => {
        let inside = data.data.message.body.track_list
        let goInside = inside.map(e => { return e.track })
        const tracks = goInside.map(e => { return { Track: e.track_name } }) 
        console.log(tracks)
      })
      .catch(err => console.log(err))
  }

}

module.exports = { TodoController }