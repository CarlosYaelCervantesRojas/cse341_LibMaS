const router = require("express").Router()
const bookItemsController = require("../controllers/bookItems")

router
  .get("/", bookItemsController.getAll)
  .get("/:bookItemId", bookItemsController.get)
  .get("/:bookItemId/details", bookItemsController.getDetail)
  .post("/", bookItemsController.post)
  .put("/:bookItemId", bookItemsController.put)
  .delete("/:bookItemId", bookItemsController.delete)
module.exports = router