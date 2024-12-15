const router = require("express").Router();
const loansController = require("../controllers/loans");
const auth = require("../utils/auth");
const loanValidator = require("../utils/loanValidator");
const checkResult = require("../utils/validate");

router
  .get("/", loansController.getAll)
  .get("/:loan_id", loansController.get)
  .post(
    "/",
    auth.isAuthenticated,
    loanValidator.postRules(),
    checkResult,
    loansController.post
  )
  .put(
    "/:loan_id",
    auth.isAuthenticated,
    loanValidator.putRules(),
    checkResult,
    loansController.put
  )
  .delete("/:loan_id", auth.isAuthenticated, loansController.delete);

module.exports = router;
