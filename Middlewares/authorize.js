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
                message: ` You don't have the Authorization for this action`
            }
        }
    })
    .catch(err =>{
        console.log('err from authorize')
        res.status(500).json(err)
    })
}