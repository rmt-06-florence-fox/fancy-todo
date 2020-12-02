const express = require('express')
const triviaRouter = express.Router()
const TriviaController = require('../controllers/3rdApiController')

triviaRouter.get('/',  TriviaController.getTrivia)

module.exports = triviaRouter