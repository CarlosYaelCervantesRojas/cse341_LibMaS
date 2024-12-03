const router = require("express").Router();
const authorsController = require("../controllers/authors");

router
  .get("/", authorsController.getAll)
  .get("/:author_id", authorsController.get)
  .post("/", authorsController.post)
  .put("/:author_id", authorsController.put)
  .delete("/:author_id", authorsController.delete);

module.exports = router;
