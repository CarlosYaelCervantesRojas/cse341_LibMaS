const router = require("express").Router()
const booksController = require("../controllers/books")

router
  .get("/", booksController.getAll)
  .post("/", booksController.post)
  .get("/:book_id", booksController.get)
  .put("/:book_id", booksController.put)


module.exports = router