const {Todo} = require('../models')

class TodoController{
  static async create(req,res){
    let newTodo= {
      name: req.body.name,
      description: req.body.description,
      due: req.body.due,
      status: req.body.status,
      category: req.body.category,
      UserId: req.loggedIn.id
    }
    try {
      let todo= await Todo.create(newTodo)
      res.status(201).json(todo)
    }catch (err) {
      if(err.name == "SequelizeUniqueConstraintError"){
        let message=err.errors[0].message
        res.status(400).json({status: '400 Bad Request',message})
      }else{
        res.status(500).json(err)
      }
    }
  }

  static async getAll(req,res){
    try{
      let todos= await Todo.findAll({
        where:{
          UserId: req.loggedIn.id
        },
        order: [['due', 'ASC']]
      });
      res.status(200).json(todos)

    }catch(err){
      res.status(500).json(err);
    }
    
  }
  static async getById(req,res){
    let id= req.params.id
    try{
      let todo= await Todo.findByPk(id);
      if(todo){
        res.status(200).json(todo)
      }else{
        throw{ status:404, message: "Not Found"}
      }

    }catch(err){
     
      res.status(404).json({status:'404 Not Found'});
    }
    
  }
  static async change(req,res){
    const id= +req.params.id
    let dataChange={
      name: req.body.name,
      description: req.body.description,
      due: req.body.due,
      status: req.body.status,
      category: req.body.category
    }
    try {
      let todo= await Todo.findByPk(id);
      if(todo){
        let change= await Todo.update(dataChange,{
          where: {id},
          returning:true
        });
        if(change){
          let todo=change[1][0]
          res.status(200).json(todo)
        }
      }else{
        throw{ status:404, message: "Not Found"};
      }

    } catch (err) {
      if(err.name == "SequelizeValidationError"){
        res.status(404).json(err)
      }else{
        res.status(500).json(err)
      }
    }
  }
  static async update(req,res){
    try {
      const id= +req.params.id
      const todo = await Todo.findByPk(id)
      if(todo){
        if(req.body.status){
          let updateStatus={
            status: req.body.status,
          }
          let update= await Todo.update(updateStatus,{
            where: {
              id
            },
            returning:true
          });
          let updateTodo = update[1][0]
          res.status(200).json(updateTodo)

        }else{
          throw{status: 400, message: "Please fill Status"}
        }

      }else{
        throw{status: 404, message: "Not Found"}
      }
    } catch (err) {
      if(err){
        res.status(err.status).json(err)
      }else{
        res.status(500).json(err)
      }
    }
  }

  static async delete(req,res){
    try {
      const id= +req.params.id
      const todo = await Todo.findByPk(id)
      if(todo){
        let del= await Todo.destroy({
          where: {id},
          returning:true
        });
        res.status(200).json({message: `Todo success to delete`, todo})

      }else{
        throw{status: 404, message: "Not Found"}
      }
    } catch (err) {
      if(err){
        res.status(err.status).json(err)
      }else{
        res.status(400).json(err)
      }
    }
  }
}

module.exports= TodoController