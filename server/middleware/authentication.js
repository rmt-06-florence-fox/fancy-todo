const { verifyToken } = require("../helpers/tokenHandler");
const { User } = require("../models");

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
