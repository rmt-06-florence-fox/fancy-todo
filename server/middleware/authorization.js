const { Todo } = require("../models/index") // ini untuk mengambil data dan membandingkan dengan data acces token yang sudah di validasi

function authorization(req, res, next) {
    let id = req.params.id
    
    Todo.findByPk(id)
        .then(data => {
            if(req.dataLoginUser.id === Todo.UserId) {
                next()
            }else {
                res.status(500).json({ error: "You don't have permission" })
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
}

module.exports = authorization