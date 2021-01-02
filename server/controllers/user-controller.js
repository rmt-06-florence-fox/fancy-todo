const {User} = require('../models/')
const Helper = require('../helper')

class UserController {

  static async register(req, res, next){
    let {fullName, userName, email, password} = req.body
    let data = { fullName, userName, email, password }
    //console.log(data)
    try {
      const response =  await User.create(data)
      let { fullName, userName, email} = response 
      res.status(201).json({fullName, userName, email})
      
    } catch (err) {
      next(err)
    }
  }

  static async login(req, res, next){
    let {email, password} = req.body
    //console.log(req.body)
    try {
      let data = await User.findOne({
        where : { email }
      })
      if (data && Helper.checkPassword(password, data.password)){
        //res.status(200).json(data)
        const { id, email, userName } = data
        const token = Helper.generateToken({ id, email, userName })

        res.status(200).json({ token, userName })  

      } else {
        throw {
          message: 'cannot find email or password',
          status : 400
        } 

      }

    } catch (err) {
      next(err)
    }
  }

  static async googleSignIn(req, res, next){
    try{
      const {email, fullName} = req.body
      let datum = await User.findOne({where : {email}})
      
      if( datum ){
        const { id, email, userName } = datum
        const token = Helper.generateToken({ id, email, userName })
        res.status(201).json({ token, userName })
      
      } else {
        let userName = fullName.split(' ')[0]
        let password = Helper.randomString()
        let record = {email, fullName, userName, password}
        let datum = await User.create(record)    
        const token = Helper.generateToken({
            id: datum.id,
            userName: datum.userName,
            email: datum.email
        })
        res.status(201).json({ token })
      }
    
    } catch (err){
      next(err)
    }
  }
}

module.exports = UserController

