const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./src/routes/index");
const crypto = require("crypto");
const session = require("express-session");
const MemoryStore = require("memorystore")(session)
const passport = require("passport");
const path = require("path")

app
.use(express.json())
.use(
    session({
      cookie: { maxAge: 86400000},
      store: new MemoryStore({
        checkPeriod: 86400000
      }),
      secret: crypto.randomBytes(64).toString("hex"),
      resave: false,
      saveUninitialized: false,
    })
  )
  .use(passport.initialize())
  .use(passport.session())
  .use(cors())
  .use("/", router)

port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("App listening on port " + port);
});
