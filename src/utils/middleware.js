const { ObjectId } = require("mongodb")
const Mongodb = require("../models/dbClient")
const dbClient = new Mongodb()

const isValidId = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({error: "invalid Id format"})
    }
    next()
}

const putDisplayName = async (req, res, next) => {
    const id = req.params.id
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    
    const displayName = firstName + " " + lastName

    try {
        await dbClient.put("users", {_id: new ObjectId(id)}, {$set:{displayName: displayName}})
        next()
    } catch (e) {
        console.log(e)
    }
}


module.exports = {
    isValidId,
    putDisplayName
}