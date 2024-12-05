const isValidId = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({error: "invalid Id format"})
    }
    next()
}


module.exports = {
    isValidId
}