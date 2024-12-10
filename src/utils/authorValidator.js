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
      .isDate({ format: "YYYY-MM-DD" })
      .withMessage("date must be in YYYY-MM-DD format")
      .optional(),
    body("dod")
      .trim()
      .escape()
      .isDate({ format: "YYYY-MM-DD" })
      .withMessage("date must be in YYYY-MM-DD format")
      .optional(),
    body("country")
      .trim()
      .escape()
      .isLength({ min: 2 })
      .withMessage("minimum 2 letters")
      .optional(),
    body("language")
      .trim()
      .escape()
      .isLength({ min: 2 })
      .withMessage("minimum 2 letters")
      .optional(),
    body("wiki")
      .trim()
      .escape()
      .isURL()
      .withMessage("please add a valid url")
      .optional(),
  ];
};

authorValidator.putRules = () => {
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
      .isDate({ format: "YYYY-MM-DD" })
      .withMessage("date must be in YYYY-MM-DD format")
      .optional(),
    body("dod")
      .trim()
      .escape()
      .isDate({ format: "YYYY-MM-DD" })
      .withMessage("date must be in YYYY-MM-DD format")
      .optional(),
    body("country")
      .trim()
      .escape()
      .isLength({ min: 2 })
      .withMessage("minimum 2 letters")
      .optional(),
    body("language")
      .trim()
      .escape()
      .isLength({ min: 2 })
      .withMessage("minimum 2 letters")
      .optional(),
    body("wiki")
      .trim()
      .escape()
      .isURL()
      .withMessage("please add a valid url")
      .optional(),
  ];
};

module.exports = authorValidator;
