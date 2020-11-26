const router = require(`express`).Router();
const todoRoutes = require(`./todoRoutes`);
const userRoutes = require(`./userRoutes`);
const calendarificController = require("../controllers/calendarificController");

router.get(`/`, (req, res) => {
  res.send(`Welcome to Fancy To-do!`);
});

router.use(`/`, userRoutes);
router.use(`/todos`, todoRoutes);
router.use("/calendar", calendarificController.show);

module.exports = router;
