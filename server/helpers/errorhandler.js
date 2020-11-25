module.exports = (err, req, res, next) => {
    if (err.status){
        res.status(err.status).json({message : err.message})
    } else if (err.msg == "Due Date"){
        res.status(400).json({
            message : "Due date must be h+1"
        })
    } else if (err.msg == "Unauthorized"){
        res.status(401).json({
            message : "You Are Unauthorized"
        })
    } else if (err.msg == "Not Found"){
        res.status(404).json({
            message : "Data Not Found"
        })
    } else if (err.msg == ""){
        res.status().json({
            message : err.errors[0].message
        })
    } else {
        res.status(500).json(err)
    }
}