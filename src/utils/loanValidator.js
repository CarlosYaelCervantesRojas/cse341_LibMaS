const { body, validationResult } = require("express-validator");

const loanValidator = {};

loanValidator.postRules = () => {
  return [
    body("bookItemId").trim().escape().notEmpty().withMessage("is required"),
    body("userId").trim().escape().notEmpty().withMessage("is required"),
    body("checkOutDate")
      .trim()
      .escape()
      .optional({ nullable: true })
      .isDate({ format: "YYYY-MM-DD" })
      .withMessage("date must be in YYYY-MM-DD format"),
    body("dueDate")
      .trim()
      .escape()
      .optional({ nullable: true })
      .isDate({ format: "YYYY-MM-DD" })
      .withMessage("date must be in YYYY-MM-DD format"),
    body("returnDate")
      .trim()
      .escape()
      .optional()
      .isDate({ format: "YYYY-MM-DD" })
      .withMessage("date must be in YYYY-MM-DD format"),
    body("feeAssessed")
      .trim()
      .escape()
      .optional()
      .isNumeric()
      .withMessage("must be a number"),
  ];
};

loanValidator.putRules = () => {
  return [
    body("bookItemId").trim().escape().optional(),
    body("userId").trim().escape().optional(),
    body("checkOutDate")
      .trim()
      .escape()
      .optional()
      .isDate({ format: "YYYY-MM-DD" })
      .withMessage("date must be in YYYY-MM-DD format"),
    body("dueDate")
      .trim()
      .escape()
      .optional()
      .isDate({ format: "YYYY-MM-DD" })
      .withMessage("date must be in YYYY-MM-DD format"),
    body("returnDate")
      .trim()
      .escape()
      .optional()
      .isDate({ format: "YYYY-MM-DD" })
      .withMessage("date must be in YYYY-MM-DD format"),
    body("feeAssessed")
      .trim()
      .escape()
      .optional()
      .isNumeric()
      .withMessage("must be a number"),
  ];
};

module.exports = loanValidator;
