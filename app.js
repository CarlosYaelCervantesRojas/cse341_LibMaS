const express = require("express")
const app = express()
const cors = require("cors")
const router = require("./src/routes/index")

app
  .use(express.json())
  .use(cors())
  .use("/", router)


app.listen(process.env.PORT || 3000, () => {
  console.log("App listening on port " + process.env.PORT || 3000)
})