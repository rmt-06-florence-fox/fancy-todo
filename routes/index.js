const express = require ('express');
const router = express.Router();

const Controller = require('../controllers/Controller.js')
const todoRouter = require('./todoRouter.js');

router.get('/', Controller.home);
router.use('/todos', todoRouter);

module.exports = router;