const express = require('express');
const router = express.Router();
const todoRoute = require('./todoRoute');

router.get('/', (req,res)=>{
    res.send('dhsaiu');
})
router.use('/todos', todoRoute);

module.exports = router;