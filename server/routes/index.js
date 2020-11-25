const router = require(`express`).Router();
const todoRoutes = require(`./todoRoutes`);
const userRoutes = require(`./userRoutes`);

router.get(`/`, (req, res) => {
  res.send(`Welcome to Fancy To-do!`);
});

router.use(`/`, userRoutes);
router.use(`/todos`, todoRoutes);

module.exports = router;
