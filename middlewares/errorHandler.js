module.exports = (err, req, res, next) =>{
    console.log(err);
    if(err.status === 400){
        res.status(err.status).json({errors: err.errors})
    } else if(err.status === 404){
        res.status(err.status).json({error: err.message})
    } else {
        res.status(500).json({error: 'Internal Server Error'});
    }
}