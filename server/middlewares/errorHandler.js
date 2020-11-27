function errorHandler(err, req, res, next) {
    let name = err.name || '';
    let status, msg;

    switch (name) {
        case 'SequelizeValidationError':
            status = 400;
            msg = err.errors.map(el => el.message).join(' ');
            break;
        case 'SequelizeUniqueConstraintError':
            status = 400;
            msg = `Email is already exists!`;
            break;
        case 'BadRequest':
            status = 400;
            msg = 'Wrong Email/Password!';
            break;
        case 'Invalid':
            status = 400;
            msg = 'Invalid Email/Password!';
            break;
        case 'AuthenticationFailed':
            status = 401;
            msg = 'Authentication Failed!';
            break;
        case 'NotAuthorized':
            status = 403;
            msg = 'Not Authorized!';
            break;
        case 'NotFound':
            status = 404;
            msg = 'Error Not Found!';
            break;
        default:
            status = 500;
            msg = 'Internal Server error';
            break;
    }
    res.status(status).json({msg})
}

module.exports = errorHandler;