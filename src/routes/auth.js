const DB = require("../models/dbClient")
const dbClient = new DB()
const { ObjectId } = require("mongodb")
const usersController = require("../controllers/users")

const passport = require("passport")

const router = require("express").Router()
const GoogleStrategy = require("passport-google-oauth20").Strategy

passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.CALLBACK_URL
    }, 
    async function(accessToken, refreshToken, profile, cb){

      let user =  await dbClient.get("users", { googleId: profile.id});

      if (user.length > 0) {
        profile.role = user[0].role
        return cb(null, user[0])
      } else {
        const result = await usersController.post(profile, accessToken)
        const newUser = await dbClient.get("users", { _id: new ObjectId(result.insertedId)})
        return cb(null, newUser);
      }
    },
    function(error, profile) {
      return cb(error, profile)
    }
  )
)

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null,user)
  })
})

passport.deserializeUser(function(user,cb) {
  process.nextTick(function() {
    return cb(null,user)
  })
})

router.get("/google", passport.authenticate("google", { scope: ["profile"]}/* #swagger.ignore = true*/))

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/google"
  }),
  (req, res) => {
    // #swagger.ignore = true
    const redirectUrl = req.session.returnTo || "/"
    delete req.session.returnTo
    res.redirect(redirectUrl)
  }
)

router.get('/logout', async (req, res) => {
  /* #swagger.ignore = true*/
  req.logout(function(error) {
    if (error) return next(error)
    res.redirect("/")
  })
})

module.exports = router