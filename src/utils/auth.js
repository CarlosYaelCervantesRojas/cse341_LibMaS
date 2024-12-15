const auth = {}

auth.isAuthenticated = async (req, res, next) => {
  if (req.isAuthenticated()) return next()
  res.status(401).json({error: "not authenticated"})
}

auth.isLibrarian = async (req, res, next) => {
  if (req.user && req.user.role == "librarian") return next()
  res.status(401).json({error: "not authorized"})
}

module.exports = auth