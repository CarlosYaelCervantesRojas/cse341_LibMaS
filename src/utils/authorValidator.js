const { body, validationResult } = require("express-validator");

const authorValidator = {};

authorValidator.postRules = () => {
  return [
    body("firstName")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("is required")
      .isLength({ min: 2 })
      .withMessage("minimum 2 letters"),
    body("lastName")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("is required")
      .isLength({ min: 2 })
      .withMessage("minimum 2 letters"),
    body("dob")
      .trim()
      .escape()
      .optional()
      .isDate({ format: "YYYY-MM-DD" })
      .withMessage("date must be in YYYY-MM-DD format"),
    body("dod")
      .trim()
      .escape()
      .optional()
      .isDate({ format: "YYYY-MM-DD" })
      .withMessage("date must be in YYYY-MM-DD format"),
    body("country")
      .trim()
      .escape()
      .optional()
      .isLength({ min: 2 })
      .withMessage("minimum 2 letters"),
    body("language")
      .trim()
      .escape()
      .optional()
      .isLength({ min: 2 })
      .withMessage("minimum 2 letters"),
    body("wiki")
      .trim()
      .optional()
      .isURL()
      .withMessage("please add a valid url"),
  ];
};

authorValidator.putRules = () => {
  return [
    body("firstName")
      .trim()
      .escape()
      .optional()
      .isLength({ min: 2 })
      .withMessage("minimum 2 letters"),
    body("lastName")
      .trim()
      .escape()
      .optional()
      .isLength({ min: 2 })
      .withMessage("minimum 2 letters"),
    body("dob")
      .optional()
      .trim()
      .escape()
      .isDate({ format: "YYYY-MM-DD" })
      .withMessage("date must be in YYYY-MM-DD format"),
    body("dod")
      .trim()
      .escape()
      .optional()
      .isDate({ format: "YYYY-MM-DD" })
      .withMessage("date must be in YYYY-MM-DD format"),
    body("country")
      .trim()
      .escape()
      .optional()
      .isLength({ min: 2 })
      .withMessage("minimum 2 letters"),
    body("language")
      .trim()
      .escape()
      .optional()
      .isLength({ min: 2 })
      .withMessage("minimum 2 letters"),
    body("wiki")
      .trim()
      .optional()
      .isURL()
      .withMessage("please add a valid url"),
  ];
};

module.exports = authorValidator;
