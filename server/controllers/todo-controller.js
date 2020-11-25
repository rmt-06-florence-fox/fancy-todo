const {ToDo} = require('../models/')


class ToDoController {

    static async findAll(req, res, next){
        //console.log(req.headers, 'PASSED HEADER FROM AUTHETICATE')
        const UserId = req.headers.loggedInUser.id
        //console.log(UserId)
       try {
           let data = await ToDo.findAll({where : {UserId}})
           res.status(200).json(data)

       } catch (err) {
           next(err)
       }
    }

    static async addTodo(req, res, next){
        
        try {
            const UserId = req.headers.loggedInUser.id
            //console.log(UserId)
            let {title, description, due_date} = req.body
            //console.log( req.get('Content-Type'))
            //console.log(req.body) 
            let data = await ToDo.create({ title, description, due_date, UserId }, {returning : true})
            //console.log(data, '>>>>> created data')
            res.status(201).json(data)

        } catch(err){
           next(err)
        }
    }

    static async findById(req, res, next){
        let id = +req.params.id
        console.log(id)
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
        const id = +req.params.id
        const {title, description, status, due_date} = req.body
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
                    message: 'target data are not found'
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