const { decode } = require(`../helpers/jwt`);
const { User, Todo } = require(`../models/index`);

const authentication = async (req, res, next) => {
  try {
    // console.log(req.headers.access_token);
    const { access_token } = req.headers;
    // console.log(req.headers);
    if (!access_token) {
      res.status(401).json({ message: "Please Login First" });
    } else {
      const decoded = decode(access_token);
      req.loggedInUser = decoded;
      const user = await User.findOne({
        where: {
          id: decoded.id,
        },
      });

      if (user) {
        next();
      } else {
        res.status(401).json({ message: "Please Login First" });
      }
    }
  } catch {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const authorization = async (req, res, next) => {
  let id = +req.params.id;
  try {
    const todo = await Todo.findOne({
      where: {
        id: id,
      },
    });

    if (todo.UserId === req.loggedInUser.id) {
      next();
    } else {
      res.status(401).json({
        message: "Forbiden Access!, You're not authorized to access this.",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { authentication, authorization };
