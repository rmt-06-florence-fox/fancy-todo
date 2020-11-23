const {Todo,User} = require('../models/index')
const {decrypt} = require('../helpers/crypt')
const jwt = require('jsonwebtoken');

class Controller {
   static getHome(req,res){
      res.send('Test')
   }

   static async postTodo(req,res){
      const {title,description,status,due_date} = req.body
      let now = new Date
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
         let errors = err.message
         if(err.name === 'SequelizeValidationError'){
            res.status(400).json({errors})
         }else{
            res.status(500).json({errors})
         }
      }
      
   }

   static async getTodo(req,res){
      try {
         let todos = await Todo.findAll()
         res.status(200).json(todos)
      } catch (error) {
         res.status(500)
      }

   }

   static async getTodoById(req,res){
      const id = +req.params.id
      try{
         let todo = await Todo.findByPk(id)
         if(todo)
            res.status(200).json(todo)
         else
            res.status(404).json({errors:"Not Found"})
      }catch(err){
         res.status(404).json({errors:"Not Found"})
      }
   }

   static async modify(req,res){
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
            res.status(400).json({error:"Not Found"})
      } catch (err) {
         let errors = err.message
         if(err.name === 'SequelizeValidationError'){
            res.status(400).json({errors})
         }else{
            res.status(500).json({errors})
         }
      }
   }

   static async update(req,res){
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
            res.status(400).json({error:"Not Found"})
      } catch (err) {
         let errors = err.message
         if(err.name === 'SequelizeValidationError'){
            res.status(400).json({errors})
         }else{
            res.status(500).json({errors})
         }
      }
   }

   static async deleteTodo(req,res){
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
            res.status(404).json({errors:"Not Found"})
      }catch(err){
         res.status(500)
      }
   }

   static async login(req,res){
      const target = {
         email:req.body.email,
         password:req.body.password
      }

      try{
         let data = await User.findOne({where:{email:target.email}})
         if(!data){
            res.status(400).json({error:"invalid email/password"})
         }else if(decrypt(target.password,data.password)){
            const token = jwt.sign({id:data.id,email:data.email},'sshhh')
            res.status(200).json({token})
         }
      }catch(err){
         res.status(400).json({error:"invalid email/password"})
      }
   }

   static async register(req,res){
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
         let errors = err.message
         if(err.name === 'SequelizeValidationError'){
            res.status(400).json({errors})
         }else{
            res.status(500).json({errors})
         }
      }
   }
}

module.exports = Controller