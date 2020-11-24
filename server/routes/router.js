const router = require('express').Router();
const routerTodo = require('./router-todo');
const routerUser = require('./router-user');
const auth = require ('../middlewares/auth')


/* /user login/register */
router.use('/', routerUser);

//middleware Authenticate
router.use(auth)

/* /todos */
router.use('/todos', routerTodo);

module.exports = router;
