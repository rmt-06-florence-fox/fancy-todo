const {Todo} = require("../models/index")

module.exports = async(req, res, next)=>{
    console.log(req.params)
    try{
        const data = await Todo.findOne({
            where:{
                id: req.params.id,
                UserId: req.loginUser.id
            }
        })
        if(data){
            next()
        }
        else{
            res.status(401).json({message: `you aren't authorized to access this todo`})
        }
    }catch{
        res.status(500).json({message: 'internal server error'})
    }
}