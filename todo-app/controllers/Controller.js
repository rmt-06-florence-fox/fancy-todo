const { Todo, User } = require('../../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// const age = require('../helpers/age')

class Controller {

    static register(req, res) {
        let obj = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }

        User.create(obj)
        .then(data => {
            res.status(201).json({ id: data.id, username: data.username, email: data.email })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: 'Failed to create user'})
        })
    }

    static login(req, res) {
        User.findOne({ where: { username: req.body.username, email: req.body.email }})
        .then(data => {
            if(!data) {
                res.status(401).json({message: 'are you sure you have your account registered?'})
            } else {
                const access_token = jwt.sign({id: data.id, username: data.username, email: data.email}, 'rahasiarangga')
                if(bcrypt.compareSync(req.body.password, data.password)) {
                    res.status(200).json({access_token})                    
                } else {
                    res.status(401).json({message: 'are you sure you have your account registered?'})
                }
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: 'Internal server error'})
        })
    }







    ////////////////////////////////////////////////////////////////
    static home(req, res) {
        ProductionHouse.findAll()
        .then(data => {
            res.render('studios', { data })
        })
        .catch(err => {
            res.send(err)
        })
    }

    static moviesList(req, res) {
        Movie.findAll( {include: ProductionHouse,
            order: [
                ['released_year', 'DESC']
            ]
        })
        .then(data => {
            console.log(data);
            res.render('movies', { data })
        })
        .catch(err => {
            res.send(err)
        })
    }

    static addNewMovie(req, res) {
        let error = null;

        if(req.query.error) {
            error = req.query.error
        }
        res.render('addMovieForm', {error})
    }

    static saveNewMovie(req, res) {
        let obj = {
            name: req.body.name,
            released_year: req.body.released_year,
            genre: req.body.genre,
        }

        Movie.create(obj)
            .then(result => {
                res.redirect('/movies')
            })
            .catch(err => {
                res.redirect(`/movies/add?error=${err.message}`)
            })
    }

    static editForm(req, res) {
       let paramId = req.params.id
        let prodHouse = []
        ProductionHouse.findAll()
            .then(data => {
                prodHouse = data
                return Movie.findByPk(paramId)
            })
            .then(value => res.render('movieEdit', {value, prodHouse}))
            .catch(err => res.send(err))
    }

    static updateEdit(req, res) {
        
        let obj = {
            name: req.body.name,
            released_year: req.body.released_year,
            genre: req.body.genre,
            ProdHouseId: req.body.ProdHouseId,
        }
        
        let id = +req.params.id

        Movie.update(obj, {where: {id}})
          .then(data => {
            res.redirect('/movies')
          })
          .catch(err => {
            res.send(err)
          })
    }

    static destroy(req, res) {
        let id = +req.params.id

        Movie.destroy({where: {id}})
          .then(data => {
            res.redirect('/movies')
          })
          .catch(err => {
            res.send(err)
          })
    }






    static castsList(req, res) {
        Cast.findAll()
        .then(data => {
            res.render('casts', { data })
        })
        .catch(err => {
            res.send(err)
        })
    }

    static addNewCast(req, res) {
        res.render('addCastForm')
    }

    static saveNewCast(req, res) {
        let obj = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            birth_year: req.body.birth_year,
            phone_number: req.body.phone_number,
            gender: req.body.gender,
        }

        Cast.create(obj)
            .then(result => {
                res.redirect('/casts')
            })
            .catch(err => {
                res.send(err)
            })
    }

    static editFormCast(req, res) {
        let paramId = req.params.id
        Cast.findByPk(paramId)
        .then(value => res.render('castEdit', {value}))
        .catch(err => res.send(err))
     }

     static updateEditCast(req, res) {
        
        let obj = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            birth_year: req.body.birth_year,
            phone_number: req.body.phone_number,
            gender: req.body.gender,
        }
        console.log(obj);
        let id = +req.params.id

        Cast.update(obj, {where: {id}})
          .then(data => {
            res.redirect('/casts')
          })
          .catch(err => {
            res.send(err)
          })
    }

    static destroyCast(req, res) {
        let id = +req.params.id

        Cast.destroy({where: {id}})
          .then(data => {
            res.redirect('/casts')
          })
          .catch(err => {
            res.send(err)
          })
    }





    static addcast(req, res) {
        let id = +req.params.id
        let cast = []
        let moviecast = []
        Cast.findAll()
        .then(value => {
            cast = value
            return MovieCast.findAll({where: {MovieId : id}
            })
        })
        .then(result => {
            moviecast = result
            return Movie.findByPk(id, {include: Cast})
        })
        .then(data => {
            // console.log(moviecast);
            res.render('addcasts', {data, cast, moviecast})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static addcastUpdate(req,res){
        const id = req.params.id
        const CastId =  req.body.cast 
        const role = req.body.role

        const newData = {
            role: req.body.role,
            MovieId: id,
            CastId: req.body.CastId
        }
        MovieCast
            .create(newData)
            .then( result =>{
                res.redirect(`/addcasts/${id}`)
            })
            .catch( err =>{
                res.send(err)
            })

    }




    static showCast(req, res) {
        const id = req.params.id

        let cast = []
        Cast.findByPk(id, {include: Movie})
        .then((data) => {
            console.log(data.Movies);
            cast = data
            return MovieCast.findAll({where: {CastId : id}})
        })
        .then((result) => {
            res.render('showCast', {cast, result, age})
        })
    }

}

module.exports = Controller