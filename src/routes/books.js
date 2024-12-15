const router = require("express").Router()
const booksController = require("../controllers/books")
const bookValidator = require("../utils/bookValidator")
const checkResult = require("../utils/validate")
const auth = require("../utils/auth")

router
  .get("/", booksController.getAll)
  .post("/", auth.isAuthenticated, auth.isLibrarian, bookValidator.postRules(), checkResult, booksController.post)
  .get("/:book_id", booksController.get)
  .get("/:book_id/items", booksController.getItems)
  .get("/:book_id/details", booksController.getDetails)
  .put("/:book_id",auth.isAuthenticated, auth.isLibrarian, bookValidator.putRules(), checkResult, booksController.put)
  .delete("/:book_id",auth.isAuthenticated, auth.isLibrarian, booksController.delete)


module.exports = router