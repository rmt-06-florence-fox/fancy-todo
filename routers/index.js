const express = require('express');
const router = express.Router();
const todoRoute = require('./todoRoute');
const userRoute = require('./userRoute');

router.get('/', (req,res)=>{
    res.send('dhsaiu');
})
router.use('/todos', todoRoute);
router.use('/user', userRoute);


module.exports = router;