/**
 * Flow (day1)
 * > init (sequelize, app.js)
 * > benerin config
 * > create table
 * > bikin model
 * > migrate model
 * > mau bikin seed terserrrah
 * > router/controller ((( beresin urusan server )))
 * > tes fitur lewat postman dulu biar enak
 * > Create -> Postman -> Save
 * > Read -> Postman -> Save
 * > Update -> Postman -> Save
 * > Delete -> Postman -> Save
 */

/**
 * bcrypt
 * 1. install
 * 2. helper
 * 3. hooks
 * 4. compare di controller
 */

 /**
  * 
  */
// console.log('dari sandbox')

if (error.name === "SequelizeValidationError"){
  const errors = []
  for (let i = 0; i < error.errors.length; i++){
    errors.push(error.errors[i].message)
  }
  console.log(error)
  res.status(400).json({message: errors})
}
else {
  res.status(500).json({message: "Internal Server Error"})
}

/**
 * link link berguna:
 * 
 */