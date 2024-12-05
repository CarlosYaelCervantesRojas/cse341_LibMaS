const router = require("express").Router();

router.get("/", async (req, res) => {
  /* #swagger.ignore = true*/
  res.status(200).send("This is the home screen!");
});
router.use("/books", require("./books"));
router.use("/bookItems", require("./bookItems"))
router.use("/authors", require("./authors"));
router.use("/loans", require("./loans"));
router.use("/api-docs", require("./apiDocs"));
router.use("/auth", require("./auth"));

module.exports = router;
