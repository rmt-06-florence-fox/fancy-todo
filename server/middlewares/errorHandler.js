function errorHandler(err, req, res, next) {
  // console.log(err);
  if (err.status) {
    res.status(err.status).json({
      message: err.message,
    });
  } else if (
    err.name == "SequelizeValidationError" ||
    err.name == "SequelizeUniqueConstraintError"
  ) {
    let errors = [];
    for (let i = 0; i < err.errors.length; i++) {
      errors.push({ message: err.errors[i].message });
    }
    res.status(400).json(errors);
  } else {
    res.status(500).json(err);
  }
}

// function errrorHandlerV2(err, _, res, _) {
//   // console.log(err);
//   switch (err.name) {
//     case "SequelizeValidationError":
//       const errors = err.errors.map((e) => ({
//         name: "BadRequest",
//         errors: e.message,
//       }));
//       return res.status(400).json({ errors });
//     case "JsonWebTokenError":
//       return res.status(401).json({
//         errors: [{ msg: err.message }],
//       });
//     case "Unauthorized":
//       return res.status(401).json({
//         errors: err.message
//       })
//     case "Notfound":
//       return res.status(404).json(err.errors)
//     case "NotLoginYet":
//       return res.status(400).json({
//         error: err.message
//       })
//     case "BadRequest":
//       res.status(400).json({
//         error: err.message
//       })
//     default:
//       res.status(500).json({
//         name: "InternalServerError",
//         error: err.errors,
//       })
//       break;
//   }
// }

module.exports = errorHandler;
