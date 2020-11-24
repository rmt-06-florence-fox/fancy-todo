const {ToDo} = require('../models/')


class ToDoController {

    static async findAll(req, res, next){
       try {
           let data = await ToDo.findAll()
           res.status(200).json(data)

       } catch (err) {
           next(err)
       }
    }

    static async addTodo(req, res, next){
        let {title, description, due_date} = req.body
        //console.log( req.get('Content-Type'))
        //console.log(req.body) 
        
        try {
            let data = await ToDo.create({ title, description, due_date }, {returning : true})
            //console.log(data, '>>>>> created data')
            res.status(201).json(data)

        } catch(err){
           next(err)
        }
    }

    static async findById(req, res, next){
        let id = +req.params.id

        try {
            let datum = await ToDo.findByPk(id)

            if(datum){
                res.status(200).json(datum)
            
            } else {
                throw {
                    message : 'requested data doesnt exist',
                    status : 404
                }
            }

        } catch (err){
            next(err)
        }
    }

    static async updateById(req, res, next){
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
                throw {
                    status : 404,
                    message: 'target data not are found'
                }
            }

        } catch (err){
           next(err)
        }
    }

    static async updateStatus(req, res, next){
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

                res.status(200).json(datum[1][0])

            } else {
                throw {
                    status: 404,
                    message: 'target data are not found'
                }
            }

        } catch (err){
           next(err)
        }
    }

    static async deleteById(req, res, next){
        let id = +req.params.id

        try {
            let datum = await ToDo.findByPk(id)

            if (datum) {
                await ToDo.destroy({
                    where : {
                        id : id
                    }
                })
                res.status(200).json(datum)

            } else {
                throw {
                    status: 404,
                    message: 'target data are not found'
                }
            }

        } catch (err) {
            next(err)
        }
    }


}

module.exports = ToDoController