const { Todo } = require('../models/index')

async function authorization (req, res, next){

    try {
        const data = await Todo.findOne({
            where:{
                id: req.params.id
            }
        })
        if(data){
            if(data.UserId === req.loggedInUser.id){
                next()
            }else{
                res.status(401).json({message: `You don't have access to this data`})
            }
        }else{
            res.status(401).json({message: `Data not found`})
        }
    } catch (error) {
        res.status(500).json({message: `Internal Server Error`})
    }
}

module.exports = authorization