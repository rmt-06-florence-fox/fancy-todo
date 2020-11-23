const { TodoList } = require ('../models')

class ControllerTodo {
    static async get (req, res) {
       try {
            const list = TodoList.findAll()
            res.status(200).json({list})
       } catch (err) {
           console.log(err)
            res.status(500).json({err})
       }
    }

    static async post (req, res) {
        try {
            const list = TodoList.create(req.body, {
                returning: true
            })
            console.log(list)
            res.status(200).json({list})
        } catch (err) {
            console.log(err)
            res.status(500).json({message:'error loading page'})
        }
    }
    
    static async getId (req, res) {
        
    }
    static async putId (req, res) {
        
    }
    static async patchId (req, res) {
        
    }
    static async deleteId (req, res) {
        
    }

}

module.exports = ControllerTodo