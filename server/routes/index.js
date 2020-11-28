const express = require("express")
const router = express.Router()
const todoRouter = require("./todo.js")
const UserController = require("../controllers/user")
const axios = require("axios")


router.post("/register", UserController.register)
router.post("/login", UserController.login)
router.use("/todos", todoRouter)
router.get("/quotes", (req, res, next) => {
  axios({
    url: "https://favqs.com/api/qotd",
    method: "GET"
  })
    .then(response => {
      res.status(200).json({
        quotes: response.data.quote.body,
        author: response.data.quote.author
      })
    })
    .catch(err => {
      next(err)
    })
})

module.exports = router