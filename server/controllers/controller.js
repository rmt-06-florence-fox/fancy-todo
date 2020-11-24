const {Todo,User} = require('../models/index')
const {decrypt} = require('../helpers/crypt')
const {sign} = require('../helpers/jwt')

class Controller {
   static getHome(req,res){
      res.send('Test')
   }

   static async postTodo(req,res,next){
      const {title,description,status,due_date} = req.body
      try{
         let data = await Todo.create(
         {
            title,
            description,
            status,
            due_date,
            UserId:req.loggedIn.id
         },
         {
            returning:true
         }
         )
         res.status(201).json(data)
      }catch(err){
         next(err)
      }
      
   }

   static async getTodo(req,res,next){
      const UserId = req.loggedIn.id
      try {
         let todos = await Todo.findAll({
            where:{
               UserId
            }
         })
         res.status(200).json(todos)
      } catch (error) {
         next(error)
      }

   }

   static async getTodoById(req,res,next){
      const id = +req.params.id
      try{
         let todo = await Todo.findByPk(id)
         if(todo)
            res.status(200).json(todo)
         else
            throw{
               status:404,
               message:"Todo Not Found"
            }
      }catch(err){
         next(err)
      }
   }

   static async modify(req,res,next){
      const id = +req.params.id
      const target = {
         title:req.body.title,
         description:req.body.description,
         status:req.body.status,
         due_date:req.body.due_date,
      }
      try {
         let updatedData = await Todo.update(target,{
            where:{
               id
            },
            returning:true
         })
         if(updatedData[0] !== 0)
            res.status(200).json(updatedData[1][0])
         else
            throw{
               status:404,
               message:"Todo Not Found"
            }
      } catch (err) {
         next(err)
      }
   }

   static async update(req,res,next){
      const id = +req.params.id
      const newStatus = req.body.status
      try {
         let updatedData = await Todo.update({status:newStatus},{
            where:{
               id
            },
            returning:true
         })
         if(updatedData[0] !== 0)
            res.status(200).json(updatedData)
         else
            throw{
               status:404,
               message:"Todo Not Found"
            }
      } catch (err) {
         next(err)
      }
   }

   static async deleteTodo(req,res,next){
      const id = +req.params.id
      try{
         let todo = await Todo.destroy({
            where:{
               id
            },
            returning:true
         })
         if(todo)
            res.status(200).json({message:'todo success to delete'})
         else
            throw{
               status:404,
               message:"Todo Not Found"
            }
      }catch(err){
         next(err)
      }
   }

   static async login(req,res,next){
      const target = {
         email:req.body.email,
         password:req.body.password
      }

      try{
         let data = await User.findOne({where:{email:target.email}})
         if(!data || !decrypt(target.password,data.password)){
            throw{
               status:400,
               message:"Invalid email/password"
            }
         }else if(decrypt(target.password,data.password)){
            const token = sign(data)
            res.status(200).json({token})
         }
      }catch(err){
         next(err);
      }
   }

   static async register(req,res,next){
      const target = {
         email:req.body.email,
         password:req.body.password
      }
      try{
         const user = await User.create(target,{
            returning:true
         })
         res.status(200).json({id:user.id,email:user.email})
      }catch(err){
         next(err)
      }
   }
}

module.exports = Controller