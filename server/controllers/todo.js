class TodoController {
  static async create (req, res, next) {
   try {
    res.send('enter in controller') 
   } catch (error) {
    res.send(error) 
   } 
  }

  static async get (req, res, next) {
    try {
    res.send('enter in controller') 
   } catch (error) {
    res.send(error) 
   } 
  }

  static async getById (req, res, next) {

  }

  static async put (req, res, next) {

  }

  static async patch (req, res, next) {

  }

  static async delete (req, res, next) {

  }
}

module.exports = TodoController