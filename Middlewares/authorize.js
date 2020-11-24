const {Todo} = require('../models')

module.exports = (req, res, next) => {

    Todo.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(data =>{
        if(data.UserId == req.loggedId.id){
            next()
        } else {
            throw {
                status: 401,
                message: ` You don't have the Authorization for this action`
            }
        }
    })
    .catch(err =>{
        next(err)
    })
}