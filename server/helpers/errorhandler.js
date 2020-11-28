module.exports = (err, req, res, next) => {
    console.log(err.errors[0].message);
    if (err.errors){
        res.status(400).json({message : err.errors[0].message})
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
    } else {
        res.status(500).json(err)
    }
}