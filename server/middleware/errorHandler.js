function errorHandler(err, req, res, next) {
    console.log(err);
    if (err.status) {
        res.status(err.status).json({ message: err.message });
    } else if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError" ) {
            let errors = [];
            for (let i = 0; i < err.errors.length; i++) {
                if(!errors.includes(err.errors[i].message)) {
                    errors.push(err.errors[i].message);
                }
            }
        res.status(400).json({ messages: errors });
    } else {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = errorHandler;