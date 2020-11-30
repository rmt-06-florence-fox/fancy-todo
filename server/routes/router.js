const router = require('express').Router();
const routerTodo = require('./router-todo');
const routerUser = require('./router-user');
const auth = require ('../middlewares/auth')
const errHandler = require ('../middlewares/errHandler')


/* /user login/register */
router.use('/', routerUser);

/* /middleware auth */
router.use(auth)

/* /todos */
router.use('/todos', routerTodo);

/* /error Handler */
router.use(errHandler)

module.exports = router;
