const express = require('express');
const router = express.Router();
const Controller = require('../controllers/Controller')

router.post('/register', Controller.register)
router.post('/login', Controller.login)

// router.get('/', Controller.home)

// router.get('/movies', Controller.moviesList)
// router.get('/movies/add', Controller.addNewMovie)
// router.post('/movies/add', Controller.saveNewMovie)
// router.get('/movies/edit/:id', Controller.editForm)
// router.post('/movies/edit/:id', Controller.updateEdit)
// router.get('/movies/delete/:id', Controller.destroy)

// router.get('/casts', Controller.castsList)
// router.get('/casts/add', Controller.addNewCast)
// router.post('/casts/add', Controller.saveNewCast)
// router.get('/casts/edit/:id', Controller.editFormCast)
// router.post('/casts/edit/:id', Controller.updateEditCast)
// router.get('/casts/delete/:id', Controller.destroyCast)

// router.get('/addcasts/:id', Controller.addcast)
// router.post('/addcasts/:id', Controller.addcastUpdate)

// router.get('/casts/:id', Controller.showCast)

module.exports = router