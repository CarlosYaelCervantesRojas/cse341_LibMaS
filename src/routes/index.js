const router = require("express").Router();

router.get("/", async (req, res) => {
    // #swagger.tags = ['Home']
    res.status(200).send("This is the home screen!")
  })
router.use("/books", require("./books"))
router.use("/bookItems", require("./bookItems"))
router.use("/authors", require("./authors"))
router.use("/api-docs", require("./apiDocs"))

module.exports = router;