const router = require("express").Router()
const bookItemsController = require("../controllers/bookItems")
const auth = require("../utils/auth")

router
  .get("/", bookItemsController.getAll)
  .get("/:bookItemId", bookItemsController.get)
  .get("/:bookItemId/details", bookItemsController.getDetail)
  .post("/", auth.isAuthenticated, bookItemsController.post)
  .put("/:bookItemId",auth.isAuthenticated, bookItemsController.put)
  .delete("/:bookItemId",auth.isAuthenticated, bookItemsController.delete)
module.exports = router