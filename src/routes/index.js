const router = require("express").Router();

router.get("/", async (req, res) => {

  // #swagger.tags = ['Home']
    console.log(req)
    res.status(200).send("This is the home screen!")
  })
router.use("/books", require("./books"))
router.use("/authors", require("./authors"))
router.use("/api-docs", require("./apiDocs"))

module.exports = router;