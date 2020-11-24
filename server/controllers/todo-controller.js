const {ToDo} = require('../models/')


class ToDoController {

    static findAll(req, res){
       ToDo
            .findAll()
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {res.status(500).json({error : err.message})})  
    }

    static async addTodo(req, res){
        let {title, description, due_date} = req.body
        //console.log( req.get('Content-Type'))
        //console.log(req.body) 
        
        try {
            let data = await ToDo.create({ title, description, due_date }, {returning : true})
            //console.log(data, '>>>>> created data')
            res.status(201).json(data)

        } catch(err){
            //res.status(500).json(err.name)
            if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
                //console.log(';masuk validasi')
                let message = err.errors.map(e => {
                    return e.message
                })
                res.status(400).json({ errors: message })

            } else {

                res.status(500).json({ error: err.message })
            }
        }
    }

    static async findById(req, res){
        let id = +req.params.id

        try {
            let datum = await ToDo.findByPk(id)

            if(datum){
                res.status(200).json(datum)
            
            } else {
                throw new Error('todo are not found')

            }

        } catch (err){
            res.status(404).json({error : err.message})
        }
    }

    static async updateById(req, res){
        let id = +req.params.id
        let {title, description, status, due_date} = req.body
        let newRecord = { title, description, status, due_date }

        try {
            let datum = await ToDo.findByPk(id)
            if (datum){
                let updatedDatum = await ToDo.update(newRecord, {
                    where : {
                        id : datum.id
                    },
                    returning : true
                })
                res.status(200).json(updatedDatum[1][0])

            } else {
                res.status(404).json({error : 'target data not are found'})
            }
        } catch (err){
            if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
                //console.log(';masuk validasi')
                let message = err.errors.map(e => {
                    return e.message
                })
                res.status(400).json({ errors: message })

            } else {

                res.status(500).json({ error: err.message })
            }
        }
    }

    static async updateStatus(req, res){
        let id = +req.params.id
        let {status} = req.body
        //console.log(status)
        try {
            let datum = await ToDo.findByPk(id)
            
            if(datum){
                datum = await ToDo.update({status}, {
                    where : {id : id}, 
                    fields : ['status'],
                    returning : true                    
                })

                res.status(200).json(datum)

            } else {
                res.status(404).json({error : 'target data are not found'})

            }

        } catch (err){
            if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
                //console.log(';masuk validasi')
                let message = err.errors.map(e => {
                    return e.message
                })
                res.status(400).json({ errors: message })

            } else {

                res.status(500).json({ error: err.message })
            }
        }
    }

    static async deleteById(req, res){
        let id = +req.params.id

        try {
            let datum = await ToDo.findByPk(id)

            if(datum){
                await ToDo.destroy({
                    where : {
                        id : id
                    }
                })
                res.status(200).json(datum)

            } else {
                res.status(404).json({error : 'target data not found'})
            }

        } catch (err) {
            if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
                //console.log(';masuk validasi')
                let message = err.errors.map(e => {
                    return e.message
                })
                res.status(400).json({ errors: message })

            } else {

                res.status(500).json({ error: err.message })
            }
        }
    }


}

module.exports = ToDoController