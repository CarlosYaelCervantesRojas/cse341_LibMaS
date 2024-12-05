const auth = {}

auth.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) next()
  res.status(401).json({error: "not authenticated"})
}

module.exports = auth