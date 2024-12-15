const router = require("express").Router();
const views = require("../views")

router.get("/", async (req, res) => {
  /* #swagger.ignore = true*/
  if (!req.isAuthenticated()) return res.status(200).send(views.login());
  res.status(200).send(views.home(req.user))
});
router.use("/books", require("./books"));
router.use("/bookItems", require("./bookItems"))
router.use("/authors", require("./authors"));
router.use("/loans", require("./loans"));
router.use("/api-docs", require("./apiDocs"));
router.use("/users", require("./users"));
router.use("/auth", require("./auth"));


module.exports = router;
