const router = require("express").Router();
const authorsController = require("../controllers/loans");

router
  .get("/", loansController.getAll)
  .get("/:loan_id", loansController.get)
  .post("/", loansController.post)
  .put("/:loan_id", loansController.put)
  .delete("/:loan_id", loansController.delete);

module.exports = router;
