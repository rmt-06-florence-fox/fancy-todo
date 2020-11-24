module.exports = (err, req, res, next) => {
    if (err.status){
        res.status(err.status).json({message : err.message})
    } else if (err.name == ""){
        res.status().json({
            message : err.errors[0].message
        })
    } else if (err.name == ""){
        res.status().json({
            message : err.errors[0].message
        })
    } else if (err.name == ""){
        res.status().json({
            message : err.errors[0].message
        })
    } else if (err.name == ""){
        res.status().json({
            message : err.errors[0].message
        })
    } else {
        res.status(500).json(err)
    }
}