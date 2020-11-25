const { Todo } = require('../models')
const axios = require('axios')

class TodoController {
  static async createTodos(req, res, next) {
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
      next(error)
    }
  }

  static async readTodos(req, res, next) {
    try {
      const dataTodo = await Todo.findAll({ where: { UserId: req.signedInUser.id } })
      res.status(200).json(dataTodo)
    } catch (error) {
      next(error)
    }
  }

  static async readTodosById(req, res, next) {
    try {
      const findId = req.params.id
      const dataTodo = await Todo.findByPk(findId)
      res.status(200).json(dataTodo)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  static async editTodosByRow(req, res, next) {
    try {
      const findId = req.params.id
      const editData = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        dueDate: req.body.dueDate
      }
      const editedData = await Todo.update(editData, { where: { id: findId }, returning: true })
      res.status(200).json(editedData[1][0])
    } catch (error) {
      next(error)
    }
  }

  static async editTodosByColumn(req, res, next) {
    try {
      const findId = req.params.id
      const editData = { status: req.body.status }
      const editedData = await Todo.update(editData, { where: { id: findId }, returning: true })
      res.status(200).json(editedData[1][0])
    } catch (error) {
      next(error)
    }
  }

  static async deleteTodos(req, res, next) {
    try {
      const findId = req.params.id
      await Todo.destroy({ where: { id: findId }})
      res.status(200).json({ message: 'Todo success to delete' })
    } catch (error) {
      next(error)
    }
  }

  static async playSongs(req, res, next) {
    // console.log('bisa')
    try {
      const trackList = await axios({
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
      const inside = trackList.data.message.body.track_list
      const goInside = inside.map(e => { return e.track })
      const tracks = goInside.map(e => { return { Track: e.track_name } })
      console.log(tracks)
      res.status(200).json(tracks)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = { TodoController }