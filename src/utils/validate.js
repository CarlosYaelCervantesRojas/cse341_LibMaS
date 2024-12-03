const { validationResult } = require("express-validator")

const checkResult = async (req, res, next) =>{
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    let newFormat = {}
    await errors.array({onlyFirstError: true}).map(error => newFormat[error.path] = error.msg)
    return res.status(400).json({errors: newFormat})
  }
  next()
}

module.exports = checkResult