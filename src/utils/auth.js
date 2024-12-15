const authorization = {}

authorization.isAuthenticated = async (req, res, next) => {
  if (req.isAuthenticated()) return next()
  req.session.redirectTo = req.originalUrl
  // return res.redirect("/auth/google")
  res.status(401).json({error: "not authenticated"})
}

authorization.isLibrarian = async (req, res, next) => {
  if (req.user && req.user.role == "librarian") return(next)
  res.status(401).json({error: "not authorized"})
}

module.exports = authorization