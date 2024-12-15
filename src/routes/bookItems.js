const router = require("express").Router()
const bookItemsController = require("../controllers/bookItems")
const bookItemValidator = require("../utils/bookItemValidator")
const checkResult = require("../utils/validate")
const auth = require("../utils/auth")

router
  .get("/", bookItemsController.getAll)
  .get("/:bookItemId", bookItemsController.get)
  .get("/:bookItemId/details", bookItemsController.getDetail)
  .post("/",auth.isAuthenticated, auth.isLibrarian, bookItemValidator.postRules(), checkResult, bookItemsController.post)
  .put("/:bookItemId", auth.isAuthenticated, auth.isLibrarian, bookItemValidator.putRules(), checkResult, bookItemsController.put)
  .delete("/:bookItemId",auth.isAuthenticated, auth.isLibrarian, bookItemsController.delete)
module.exports = router 