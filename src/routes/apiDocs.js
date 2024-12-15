const router = require("express").Router()
const swaggerUI = require("swagger-ui-express")
const swaggerDoc = require("../swagger/documentation.json")

router.use("/", async (req, res, next) => {
  swaggerDoc.host = req.get('host')
  swaggerDoc.securityDefinitions.google_oauth.clientId = process.env.GOOGLE_CLIENT_ID
  req.swaggerDoc = swaggerDoc
  next()
}, swaggerUI.serveFiles(swaggerDoc, {}), swaggerUI.setup())


module.exports = router