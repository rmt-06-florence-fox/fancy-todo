class ControllerMain {
    static async home (req, res) {
        res.status('200').json({message: 'hello'})
    }
}

module.exports = ControllerMain