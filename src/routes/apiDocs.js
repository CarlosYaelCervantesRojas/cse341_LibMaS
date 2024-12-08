const router = require("express").Router()
const swaggerUI = require("swagger-ui-express")
const swaggerDoc = require("../swagger/documentation.json")

router.use("/", async (req, res, next) => {
  swaggerDoc.host = req.get('host')
  req.swaggerDoc = swaggerDoc
  next()
}, swaggerUI.serveFiles(swaggerDoc, {}), swaggerUI.setup())


module.exports = router