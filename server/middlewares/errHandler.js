module.exports =  (err, req, res, next) => {
    console.log(err)
    if (err.status) {
        res.status(err.status).json({message: err.message})
    }
    else if (err.isAxiosError) {
        res.status(500).json({message: err.message})
    }
    else if (err.errors) {
        const mes = err.errors.map (el => {
            return {
                message: el.message
            }
        })
        res.status(400).json({errors: mes})
    }
    else {
        res.status(500).json(err)
    }
}