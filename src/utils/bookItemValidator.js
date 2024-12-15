const { body, validationResult } = require("express-validator")

const bookItemValidator = {}

bookItemValidator.postRules = () => {
  return [
    body("barCode")
      .trim()
      .escape()
      .notEmpty().withMessage("is required")
      .isLength({min: 2}).withMessage("too short"),
    body("bookId")
      .trim()
      .escape()
      .notEmpty().withMessage("is required")
      .isLength({min: 10}).withMessage("too short"),
    body("available")
      .notEmpty().withMessage("is required")
      .isBoolean().withMessage("must be boolean"),
    body("discarded")
      .notEmpty().withMessage("is required")
      .isBoolean().withMessage("must be boolean"),
    body("discardedDate")
      .optional({ nullable: true})
      .trim()
      .escape()
      .isDate({format: "YYYY-MM-DD"}).withMessage("date must be in YYYY-MM-DD format"),
    body("discardedReason")
      .optional({ nullable: true})
      .trim()
      .escape()
      .isLength({min: 2}).withMessage("min 2 characters long")
  ]
}

bookItemValidator.putRules = () => {
  return [
    body("barCode")
      .optional()
      .trim()
      .escape()
      .notEmpty().withMessage("is required")
      .isLength({min: 2}).withMessage("too short"),
    body("bookId")
      .optional()
      .trim()
      .escape()
      .notEmpty().withMessage("is required"),
    body("available")
      .optional()
      .notEmpty().withMessage("is required")
      .isBoolean().withMessage("must be boolean"),
    body("discarded")
      .optional()
      .notEmpty().withMessage("is required")
      .isBoolean().withMessage("must be boolean"),
    body("discardedDate")
      .optional()
      .trim()
      .escape()
      .notEmpty().withMessage("is required")
      .isDate({format: "YYYY-MM-DD"}).withMessage("date must be in YYYY-MM-DD format"),
    body("discardedReason")
      .optional()
      .trim()
      .escape()
      .notEmpty().withMessage("is required")
      .isLength({min: 2}).withMessage("min 2 characters long")
  ]
}

module.exports = bookItemValidator