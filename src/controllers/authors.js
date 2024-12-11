const { ObjectId } = require("mongodb");
const Database = require("../models/dbClient");
const db = new Database();
const { statusCodes } = require("../utils/index");

const COLLECTION = "authors";
const authorsController = {};

// Retrieves all authors - Uses "get" function from dbClient and populates the collection name, leaves qry param empty to retrieve all records
authorsController.getAll = async (req, res) => {
  /* 
  #swagger.tags = ['Authors']
  #swagger.description = 'Returns all authors from the database'
  #swagger.responses[200] = { description: 'Authors retrieved successfully' }
  #swagger.responses[500] = { description: 'Internal server error (database or Node.js)' }
  */
  try {
    const authors = await db.get(COLLECTION);
    res.status(statusCodes.OK).json(authors);
  } catch (e) {
    console.error(e.message);
    res
      .status(statusCodes.InternalServerError)
      .json({ error: "internal server error" });
  }
};

// Retrieves author - Uses "get" function from dbClient and populates the collection name, populating qry param with specific ID
authorsController.get = async (req, res) => {
  /* 
    #swagger.tags = ["Authors"]
    #swagger.description = "Returns a single author with the given ID"
    #swagger.responses[200] = { description: "Author with the given id retrieval successfully" }
    #swagger.responses[500] = { description: "Internal server error (database or Node.js)" }
  */
  try {
    const authorId = req.params.author_id;
    if (!ObjectId.isValid(authorId)) {
      return res
        .status(statusCodes.BadRequest)
        .json({ message: "Invalid author ID" });
    }

    const author = await db.get(COLLECTION, {
      _id: new ObjectId(authorId),
    });

    if (!author) {
      return res
        .status(statusCodes.NotFound)
        .json({ message: "Author not found" });
    }

    res.status(statusCodes.OK).json(author);
  } catch (e) {
    console.error(e.message);
    res
      .status(statusCodes.InternalServerError)
      .json({ error: "internal server error" });
  }
};

// Adds author - Defines author fields and uses "post" function from dbClient to add new author
authorsController.post = async (req, res) => {
  /* 
    #swagger.tags = ["Authors"]
    #swagger.description = "Adds a new author to the database"
    #swagger.parameters["body"] = {
      in: "body",
      description: "JSON containing author data",
      schema: {
        "firstName": "Brandon",
        "lastName": "Sanderson",
        "dob": "1975-12-19",
        "dod": "",
        "country": "US",
        "language": "English",
        "wiki": "https://en.wikipedia.org/wiki/Brandon_Sanderson"
      }
    }
    #swagger.responses[201] = { description: "New author created successfully" }
    #swagger.responses[500] = { description: "Internal server error (database or Node.js)" }
  */
  const author = req.body;
  try {
    const result = await db.post(COLLECTION, author);
    res.status(statusCodes.Created).json({ id: result.insertedId, ...author });
  } catch (e) {
    console.error(e.message);
    res
      .status(statusCodes.InternalServerError)
      .json({ message: "Failed to add author" });
  }
};

// Edits author - Uses "put" function from dbClient and populates the collection name, populating qry param with specific ID
authorsController.put = async (req, res) => {
  /* 
  #swagger.tags = ['Authors']
  #swagger.description = "Update an existing author. Fields not provided will not be changed."
  #swagger.parameters["body"] = {
    in: "body",
    description: "JSON containing author data",
    schema: {
      "dod": "2025-01-01",
    }
  }
  #swagger.response[200] = {description: "Author updated successfully"}
  #swagger.response[400] = {description: "Bad request (missing or invalid data)"}
  #swagger.response[500] = {description: "Internal server error (database or Node.js)"}
  */
  const authorId = req.params.author_id;
  const updatedData = req.body;

  try {
    const result = await db.put(
      COLLECTION,
      { _id: new ObjectId(authorId) },
      { $set: updatedData }
    );

    if (result.matchedCount === 0) {
      return res
        .status(statusCodes.NotFound)
        .json({ message: "Author not found" });
    }
    if (result.modifiedCount === 0) {
      return res
        .status(statusCodes.OK)
        .json({ message: "Nothing was modified" });
    }
    res.status(statusCodes.OK).json({ message: "Author updated" });
  } catch (e) {
    res
      .status(statusCodes.InternalServerError)
      .json({ message: "An error occurred while updating the author" });
  }
};

// Deletes author - Uses "delete" function from dbClient and populates the collection name, populating qry param with specific ID
authorsController.delete = async (req, res) => {
  /* 
    #swagger.tags = ['Authors']
    #swagger.description = "Deletes an author with the given ID"
    #swagger.response[200] = {description: "Author deleted succesfully"}
    #swagger.response[500] = {description: "Internal server error (database or Node.js)"}
  */
  try {
    const result = await db.delete(COLLECTION, {
      _id: new ObjectId(req.params.author_id),
    });

    if (result.deletedCount === 0) {
      return res
        .status(statusCodes.NotFound)
        .json({ message: "Author not found" });
    }

    res.status(statusCodes.NoContent).send();
  } catch (e) {
    console.error(e.message);
    res
      .status(statusCodes.InternalServerError)
      .json({ message: "An error occurred while deleting the author" });
  }
};

module.exports = authorsController;
