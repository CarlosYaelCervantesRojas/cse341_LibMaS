const router = require("express").Router()


router
  .get("/", async (req, res) => {
    res.status(200).send("This is the home screen!")
  })
  .use("/books", require("./books"))


module.exports = router