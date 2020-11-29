module.exports = (err, req, res, next) => {
    console.log(err);
    if (err.message == "Email/Password Invalid"){
        res.status(400).json({
            message : "Email/Password Invalid"
        }) 
    } else if (err.message == "Cannot read property 'userId' of null"){
        res.status(404).json({
            message : "Data not found"
        })
    } else if (err.message == "Due Date"){
        res.status(400).json({
            message : "Due date must be h+1"
        })
    } else if (err.message == "Unauthorized"){
        res.status(401).json({
            message : "You Are Unauthorized"
        })
    } else if (err.message == "Not Found"){
        res.status(404).json({
            message : "Data Not Found"
        })
    } else if (err.message == null){
        res.status(500).json(err.message)
    // } else if (err.errors[0].message == "Validation isEmail on email failed"){
    //     res.status(400).json({
    //         message : "Please input your email"
    //     })
    // } else if (err.errors[0].message == "Validation len on password failed"){
    //     res.status(400).json({
    //         message : "Password minimum 6 character"
    //     })
    // } else if (err.errors[0].message == "email must be unique"){
    //     res.status(400).json({
    //         message : "Email registered"
    //     })
    } 
}