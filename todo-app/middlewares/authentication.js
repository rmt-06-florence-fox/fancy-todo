module.exports = (req, res, next) => {
    const { access_token } = req.headers
    if (!access_token) {
        res.status(401).json({
            message: 'Login required'
        })
    } else {
        next();
    }
}