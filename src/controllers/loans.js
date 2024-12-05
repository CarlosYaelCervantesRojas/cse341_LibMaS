const { ObjectId } = require("mongodb");
const Database = require("../models/dbClient");
const db = new Database();

const COLLECTION = "loans";
const loansController = {};

// Retrieves all loans - Uses "get" function from dbClient and populates the collection name, leaves qry param empty to retrieve all records
loansController.getAll = async (req, res) => {
  // #swagger.tags = ['Loans']
  try {
    const loans = await db.get(COLLECTION);
    res.status(200).json(loans);
  } catch (e) {
    console.error(e.message);
  }
};

// Retrieves loan - Uses "get" function from dbClient and populates the collection name, populating qry param with specific ID
loansController.get = async (req, res) => {
  // #swagger.tags = ['Loans']
  try {
    const loan = await db.get(COLLECTION, {
      _id: new ObjectId(req.params.loan_id),
    });
    if (!loan) {
      return res.status(404).json({ message: "loan not found" });
    }

    res.status(200).json(loan);
  } catch (e) {
    console.error(e.message);
  }
};

// Adds loan - Defines loan fields and uses "post" function from dbClient to add new loan
loansController.post = async (req, res) => {
  // #swagger.tags = ['Loans']
  try {
    const { bookId, userId, checkOutDate, dueDate, returnDate, feeAssessed } =
      req.body;

    // calculates the default dueDate if one isn't provided (based on 21 days from checkOutDate)
    const calcDueDate = (checkedOut) => {
      const date = new Date(checkedOut);
      date.setDate(date.getDate() + 21);
      return date;
    };

    // Use today's date if checkOutDate is not provided (helps calculate due date)
    const effectiveDate = checkOutDate || new Date();

    const loan = {
      bookId,
      userId,
      checkOutDate: effectiveDate,
      dueDate: dueDate || calcDueDate(effectiveDate), // calculates based on checkout date (or today's date if not provided)
      returnDate: returnDate || null,
      feeAssessed: feeAssessed || null,
    };

    const result = await db.post(COLLECTION, loan);
    res.status(201).json({ id: result.insertedId, ...loan });
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ message: "Failed to add loan" });
  }
};

// Edits loan - Uses "put" function from dbClient and populates the collection name, populating qry param with specific ID
loansController.put = async (req, res) => {
  // #swagger.tags = ['Loans']
  try {
    const loan = await db.put(
      COLLECTION,
      { _id: new ObjectId(req.params.loan_id) },
      { $set: req.body }
    );

    if (loan.matchedCount === 0) {
      return res.status(404).json({ message: "loan not found" });
    }

    if (loan.modifiedCount === 0) {
      return res.status(200).json({ message: "Nothing to modify" });
    }

    res.status(200).json({ message: "loan updated" });
  } catch (e) {
    console.error(e.message);
    res
      .status(500)
      .json({ message: "An error occurred while updating the loan" });
  }
};

// Deletes loan - Uses "delete" function from dbClient and populates the collection name, populating qry param with specific ID
loansController.delete = async (req, res) => {
  // #swagger.tags = ['Loans']
  try {
    const loan = await db.delete(COLLECTION, {
      _id: new ObjectId(req.params.loan_id),
    });

    if (loan.deletedCount === 0) {
      return res.status(404).json({ message: "loan not found" });
    }

    res.status(204).send();
  } catch (e) {
    console.error(e.message);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the loan" });
  }
};

module.exports = loansController;
