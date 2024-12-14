const router = require("express").Router()
const bookItemsController = require("../controllers/bookItems")
const bookItemValidator = require("../utils/bookItemValidator")
const checkResult = require("../utils/validate")
const auth = require("../utils/auth")

router
  .get("/", bookItemsController.getAll)
  .get("/:bookItemId", bookItemsController.get)
  .get("/:bookItemId/details", bookItemsController.getDetail)
  .post("/", bookItemValidator.postRules(), checkResult, bookItemsController.post)
  .put("/:bookItemId", bookItemValidator.putRules(), checkResult, bookItemsController.put)
  .delete("/:bookItemId", bookItemsController.delete)
module.exports = router