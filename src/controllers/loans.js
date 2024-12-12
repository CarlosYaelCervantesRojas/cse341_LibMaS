const { ObjectId } = require("mongodb");
const Database = require("../models/dbClient");
const db = new Database();
const { statusCodes } = require("../utils/index");

const COLLECTION = "loans";
const loansController = {};

// Retrieves all loans - Uses "get" function from dbClient and populates the collection name, leaves qry param empty to retrieve all records
loansController.getAll = async (req, res) => {
  /* 
    #swagger.tags = ['Loans']
    #swagger.description = 'Returns all loans from the database'
    #swagger.responses[200] = { description: 'Loans retrieved successfully' }
    #swagger.responses[500] = { description: 'Internal server error (database or Node.js)' }
  */
  try {
    const loans = await db.get(COLLECTION);
    res.status(200).json(loans);
  } catch (e) {
    console.error(e.message);
    res
      .status(statusCodes.InternalServerError)
      .json({ error: "internal server error" });
  }
};

// Retrieves loan - Uses "get" function from dbClient and populates the collection name, populating qry param with s*pecific ID
loansController.get = async (req, res) => {
  /* 
    #swagger.tags = ['Loans']
    #swagger.description = "Returns loans with the given ID"
    #swagger.responses[200] = { description: "Loans with the given id retrieval successfully" }
    #swagger.responses[500] = { description: "Internal server error (database or Node.js)" }
  */
  try {
    const loanId = req.params.loan_id;

    if (!ObjectId.isValid(loanId)) {
      return res
        .status(statusCodes.BadRequest)
        .json({ message: "Invalid loan ID" });
    }

    const loan = await db.get(COLLECTION, {
      _id: new ObjectId(loanId),
    });

    if (!loan) {
      return res
        .status(statusCodes.BadRequest)
        .json({ message: "loan not found" });
    }

    res.status(statusCodes.OK).json(loan);
  } catch (e) {
    console.error(e.message);
    res
      .status(statusCodes.InternalServerError)
      .json({ error: "internal server error" });
  }
};

// Adds loan - Defines loan fields and uses "post" function from dbClient to add new loan
loansController.post = async (req, res) => {
  /* 
  #swagger.tags = ['Loans']
  #swagger.description = "Adds a new loan to the database"
    #swagger.parameters["body"] = {
      in: "body",
      description: "JSON containing loan data",
      schema: {
        "bookItemId": "123456",
        "userId": "654321",
        "checkOutDate": "2024-12-01",
        "dueDate": "2024-12-22"
      }
    }
    #swagger.responses[201] = { description: "New loan created successfully" }
    #swagger.responses[500] = { description: "Internal server error (database or Node.js)" }
  */

  try {
    const { bookItemId, userId, checkOutDate, dueDate } = req.body;

    if (!bookItemId || !userId) {
      return res
        .status(statusCodes.BadRequest)
        .json({ message: "Missing required fields: bookItemId or userId" });
    }

    // calculates the default dueDate if one isn't provided (based on 21 days from checkOutDate)
    const calcDueDate = (checkedOut) => {
      const date = new Date(checkedOut);
      date.setDate(date.getDate() + 21);
      return date.toISOString().split("T")[0];
    };

    // Use today's date if checkOutDate is not provided (helps calculate due date)
    const effectiveCheckOutDate = checkOutDate
      ? new Date(checkOutDate).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0];

    // Calculates Due Date if not expliciately provided
    const effectiveDueDate = dueDate || calcDueDate(effectiveCheckOutDate);

    const loan = {
      bookItemId,
      userId,
      checkOutDate: effectiveCheckOutDate,
      dueDate: effectiveDueDate,
    };

    const result = await db.post(COLLECTION, loan);
    res.status(statusCodes.Created).json({ id: result.insertedId, ...loan });
  } catch (e) {
    console.error(e.message);
    res
      .status(statusCodes.InternalServerError)
      .json({ message: "Failed to add loan" });
  }
};

// Edits loan - Uses "put" function from dbClient and populates the collection name, populating qry param with specific ID
loansController.put = async (req, res) => {
  /* 
    #swagger.tags = ['Loans']
    #swagger.description = "Update an existing loan to reflect "returned". Calculates a fee if late. Fields not provided will not be changed."
    #swagger.parameters["body"] = {
      in: "body",
      description: "JSON containing loan data",
      schema: {
        "returnDate": "2024-12-20",
        "feeAssessed": "2.50"
      }
    }
    #swagger.response[200] = {description: "Loan updated successfully"}
    #swagger.response[400] = {description: "Bad request (missing or invalid data)"}
    #swagger.response[500] = {description: "Internal server error (database or Node.js)"}
  */
  const loanID = req.params.loan_id;
  const updatedData = req.body;

  try {
    // fetch the existing loan
    const loan = await db.get(COLLECTION, { _id: new ObjectId(loanID) });

    // check that the loan exists
    if (!loan) {
      return res
        .status(statusCodes.NotFound)
        .json({ message: "Loan not found" });
    }

    // Create a default returnDate of today if not provided
    const today = new Date().toISOString().split("T")[0];
    const returnDate = updatedData.returnDate || today;

    // Calculate a Late Fee if return date is later than the due date ($0.25 per day), unless explicately provided
    let feeAssessed = loan.feeAssessed || 0;
    if (loan.dueDate && new Date(returnDate) > new Date(loan.dueDate)) {
      const daysLate = Math.ceil(
        (new Date(returnDate) - new Date(loan.dueDate)) / (1000 * 60 * 60 * 24)
      );
      feeAssessed = parseFloat((daysLate * 0.25).toFixed(2));
    }

    // put the updated values in an object variable
    const updateFields = {
      ...updatedData,
      returnDate,
      feeAssessed,
    };

    // update the database
    const result = await db.put(
      COLLECTION,
      { _id: new ObjectId(loanID) },
      { $set: updateFields }
    );

    // check for errors and provide status
    if (result.matchedCount === 0) {
      return res
        .status(statusCodes.NotFound)
        .json({ message: "Loan not found" });
    }

    if (result.modifiedCount === 0) {
      return res
        .status(statusCodes.OK)
        .json({ message: "Nothing was modified" });
    }

    res.status(statusCodes.OK).json({ message: "Loan updated" });
  } catch (e) {
    console.error(e.message);
    res
      .status(statusCodes.InternalServerError)
      .json({ message: "An error occurred while updating the loan" });
  }
};

// Deletes loan - Uses "delete" function from dbClient and populates the collection name, populating qry param with specific ID
loansController.delete = async (req, res) => {
  /* 
    #swagger.tags = ['Loans']
    #swagger.description = "Deletes an loan with the given ID"
    #swagger.response[200] = {description: "Loan deleted succesfully"}
    #swagger.response[500] = {description: "Internal server error (database or Node.js)"}
  */
  try {
    const loan = await db.delete(COLLECTION, {
      _id: new ObjectId(req.params.loan_id),
    });

    if (loan.deletedCount === 0) {
      return res.status(404).json({ message: "loan not found" });
    }

    res.status(statusCodes.NoContent).send();
  } catch (e) {
    console.error(e.message);
    res
      .status(statusCodes.InternalServerError)
      .json({ message: "An error occurred while deleting the loan" });
  }
};

module.exports = loansController;
