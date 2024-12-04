const { ObjectId } = require("mongodb");
const Database = require("../models/dbClient");
const db = new Database();

const COLLECTION = "authors";
const authorsController = {};

// Retrieves all authors - Uses "get" function from dbClient and populates the collection name, leaves qry param empty to retrieve all records
authorsController.getAll = async (req, res) => {
  // #swagger.tags = ['Authors']
  try {
    const authors = await db.get(COLLECTION);
    res.status(200).json(authors);
  } catch (e) {
    console.error(e.message);
  }
};

// Retrieves author - Uses "get" function from dbClient and populates the collection name, populating qry param with specific ID
authorsController.get = async (req, res) => {
  // #swagger.tags = ['Authors']
  try {
    const author = await db.get(COLLECTION, {
      _id: new ObjectId(req.params.author_id),
    });
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }

    res.status(200).json(author);
  } catch (e) {
    console.error(e.message);
  }
};

// Adds author - Defines author fields and uses "post" function from dbClient to add new author
authorsController.post = async (req, res) => {
  // #swagger.tags = ['Authors']
  try {
    const { firstName, lastName, dob, dod, country, language, wiki } = req.body;
    const author = {
      firstName,
      lastName,
      dob: dob || null,
      dod: dod || null,
      country: country || null,
      language: language || null,
      wiki: wiki || null,
    };
    const result = await db.post(COLLECTION, author);
    res.status(201).json({ id: result.insertedId, ...author });
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ message: "Failed to add author" });
  }
};

// Edits author - Uses "put" function from dbClient and populates the collection name, populating qry param with specific ID
authorsController.put = async (req, res) => {
  // #swagger.tags = ['Authors']
  try {
    const author = await db.put(
      COLLECTION,
      { _id: new ObjectId(req.params.author_id) },
      { $set: req.body }
    );

    if (author.matchedCount === 0) {
      return res.status(404).json({ message: "Author not found" });
    }

    if (author.modifiedCount === 0) {
      return res.status(200).json({ message: "Nothing to modify" });
    }

    res.status(200).json({ message: "Author updated" });
  } catch (e) {
    console.error(e.message);
    res
      .status(500)
      .json({ message: "An error occurred while updating the author" });
  }
};

// Deletes author - Uses "delete" function from dbClient and populates the collection name, populating qry param with specific ID
authorsController.delete = async (req, res) => {
  // #swagger.tags = ['Authors']
  try {
    const author = await db.delete(COLLECTION, {
      _id: new ObjectId(req.params.author_id),
    });

    if (author.deletedCount === 0) {
      return res.status(404).json({ message: "Author not found" });
    }

    res.status(204).send();
  } catch (e) {
    console.error(e.message);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the author" });
  }
};

module.exports = authorsController;
