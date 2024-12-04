const { body, validationResult } = require("express-validator")

const bookValidator = {}

bookValidator.postRules = () => {
  return [
    body("title")
      .trim()
      .escape()
      .notEmpty().withMessage("is required")
      .isLength({min: 2}).withMessage("please add a valid"),
    body("authorId")
      .trim()
      .escape()
      .notEmpty().withMessage("is required"),
    body("isbn")
      .trim()
      .escape()
      .notEmpty().withMessage("is required")
      .isLength({min: 10}).withMessage("please add a valid ISBN"),
    body("edition")
      .trim()
      .escape()
      .notEmpty().withMessage("is required")
      .isLength({min: 2}).withMessage("min 2 characters long"),
    body("pubDate")
      .trim()
      .escape()
      .notEmpty().withMessage("is required")
      .isDate({format: "YYYY-MM-DD"}).withMessage("date must be in YYYY-MM-DD format"),
    body("genre")
      .trim()
      .escape()
      .notEmpty().withMessage("is required")
      .isLength({min: 2}).withMessage("min 2 characters long"),
    body("cover")
      .trim()
      .notEmpty().withMessage("is required")
      .isURL().withMessage("please add a valid url"),
    ]
}

bookValidator.putRules = () => {
  return [
    body("title")
      .optional()
      .trim()
      .escape()
      .notEmpty().withMessage("is required")
      .isLength({min: 2}).withMessage("please add a valid title"),
    body("author_id")
      .optional()
      .trim()
      .escape()
      .notEmpty().withMessage("is required"),
    body("isbn")
      .optional()
      .trim()
      .escape()
      .notEmpty().withMessage("is required")
      .isLength({min: 10}).withMessage("please add a valid ISBN"),
    body("edition")
      .optional()
      .trim()
      .escape()
      .notEmpty().withMessage("is required")
      .isLength({min: 2}).withMessage("min 2 characters long"),
    body("pub_date")
      .optional()
      .trim()
      .escape()
      .notEmpty().withMessage("is required")
      .isISO8601()
      .isDate({format: "YYYY-MM-DD"}).withMessage("date must be in YYYY-MM-DD format"),
    body("genre")
      .optional()
      .trim()
      .escape()
      .notEmpty().withMessage("is required")
      .isLength({min: 2}).withMessage("min 2 characters long"),
    body("cover")
      .optional()
      .trim()
      .escape()
      .notEmpty().withMessage("is required")
      .isURL().withMessage("please add a valid url cover"),
    ]
}

module.exports = bookValidator