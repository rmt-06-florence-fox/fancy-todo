const {Todo} = require('../models/index')

class Controller {
   static getHome(req,res){
      res.send('Test')
   }

   static async postTodo(req,res){
      const {title,description,status,due_date} = req.body
      let now = new Date
      console.log("masuk");
      if(due_date === now.toISOString().split('T')[0]){
         res.status(400).json({error:"Tanggal harus lebih dari hari ini"})
      }
      else{

         try{
            let data = await Todo.create(
            {
               title,
               description,
               status,
               due_date
            },
            {
               returning:true
            }
            )
            res.status(201).json(data)
         }catch(err){
            res.status(500)
         }
      }
   }

   static async getTodo(req,res){
      try {
         let todos = await Todo.findAll()
      } catch (error) {
         
      }

   }
}

module.exports = Controller