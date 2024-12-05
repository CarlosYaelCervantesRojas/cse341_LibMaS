const passport = require("passport")

const router = require("express").Router()
const GoogleStrategy = require("passport-google-oauth20").Strategy

passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.CALLBACK_URL
    }, 
    function(accessToken, refreshToken, profile, cb){
      console.log(profile)
      return cb(null, profile)
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
    res.redirect("/")
  }
)

module.exports = router