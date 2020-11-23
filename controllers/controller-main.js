class ControllerMain {
    static async home (req, res) {
        try {
            res.status(200).json({message: 'hello'})
        } catch (err) {
            res.status(500).json({message:'error loading page'})
        }
    }
}

module.exports = ControllerMain