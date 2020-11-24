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
 * > install
 * > helper
 * > hooks
 * > compare di controller
 */

 /**
  * 
  */
// console.log('dari sandbox')

/**
 * link link berguna:
 * 
 */
const { User } = require("../models");
const { verifyToken } = require("../helpers/tokenHandler");

module.exports = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (access_token) {
      const decoded = verifyToken(access_token);
      req.loggedin = decoded;
      const findUser = await User.findOne({
        where: {
          id: decoded.id,
        },
      });
      if (findUser) {
        next();
      } else {
        res.status(401).json({
          msg: "Please Login First",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
  next();
};