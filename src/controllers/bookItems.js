const { ObjectId } = require("mongodb")
const Database = require("../models/dbClient")
const db = new Database()

const BOOK_ITEMS = "bookItems"
const BOOK = "books"
const AUTHOR = "authors"

const bookItemsController = {}

bookItemsController.getAll = async (req, res) => {
  /*
    #swagger.tags = ['Book Items']
    #swagger.description = 'Return all book items from the database'
    #swagger.responses[200] = { description: 'Book items retrieved successfully' }
    #swagger.responses[404] = { description: 'No book items found' }
    #swagger.responses[500] = { description: 'Internal server error (databse or node)' }
  */
  try {
    const items = await db.get(BOOK_ITEMS)
    if (items.length == 0) res.status(404).json({error: "no data available"})
    res.status(200).json(items)
  } catch (e) {
    console.error(e)
    res.status(500).send(e)
  }
}

bookItemsController.get = async (req, res) => {
  /*
    #swagger.tags = ['Book Items']
    #swagger.description = 'Returns a single book item with the given ID'
    #swagger.responses[200] = { description: 'Book item with the given id retrieval successfully' }
    #swagger.responses[404] = { description: 'No book items found with the given ID' }
    #swagger.responses[500] = { description: 'Internal server error (databse or node)' }
  */
  try {
    const item = await db.get(BOOK_ITEMS, {_id: new ObjectId(req.params.bookItemId)})
    if (item.length == 0) res.status(404).json({error: "no item found"})
    res.status(200).json(item)
  } catch(e) {
    console.error(e)
    res.status(500).send(e)
  }
}

bookItemsController.getDetail = async (req, res) => {
  /*
    #swagger.tags = ['Book Items']
    #swagger.description = 'Returns a single book and details including book and author information'
    #swagger.responses[200] = { description: 'Book item with the given id retrieval successfully' }
    #swagger.responses[404] = { description: 'No book items found with the given ID' }
    #swagger.responses[500] = { description: 'Internal server error (databse or node)' }
  */
  try {
    const item = await db.get(BOOK_ITEMS, {_id: new ObjectId(req.params.bookItemId)})
    const book = await db.get(BOOK, { _id: new ObjectId(item[0].bookId)})
    const author = await db.get(AUTHOR, { _id: new ObjectId(book[0].authorId)})
    delete item[0].bookId
    delete book[0].authorId
    let data = [{...item[0], bookDetails: book[0], author: author[0]}] 
    res.status(200).json(data)
  } catch (e) {
    console.error(e)
    res.status(500).send(e)
  }
}

bookItemsController.post = async (req, res) => {
  /*
    #swagger.tags = ['Book Items']
    #swagger.description = 'Inserts a new book item to the database'
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Json containing book detail data',
      schema: {
          "barCode": "9780439139601-010",
          "bookId": "674e9051d8a0e1389c0390e7",
          "available": true,
          "discarded": false,
          "discardedDate": null,
          "discardedReason": null
      }
    } 
    #swagger.responses[200] = { description: 'New book item created successfully' }
    #swagger.responses[500] = { description: 'Internal server error (databse or node)' }
  */
  try {
    const result = await db.post(BOOK_ITEMS, req.body)
    res.status(200).json(result)
  } catch (e) {
    console.error(e)
    res.status(500).send(e)
  }
}

bookItemsController.put = async (req, res) => {
  /*
    #swagger.tags = ['Book Items']
    #swagger.description = 'Updates an existing book item'
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Json containing book data',
      schema:   {
        "available": true,
      }
    }
    #swagger.responses[200] = { description: 'Book item updated successfully' }
    #swagger.responses[500] = { description: 'Internal server error (databse or node)' }
  */
  try {
    const result = await db.put(BOOK_ITEMS, { _id: new ObjectId(req.params.bookItemId)}, {$set: req.body})
    res.status(204).json(result)
  } catch(e) {
    console.error(e)
    res.status(500).json({error: "internal server error"})
  }
}

bookItemsController.delete = async (req, res) => {
  /*
    #swagger.tags = ['Book Items']
    #swagger.description = 'Deletes a single book item with the given ID'
    #swagger.responses[204] = { description: 'Book item with the given id deleted successfully' }
    #swagger.responses[500] = { description: 'Internal server error (databse or node)' }
  */
  try {
    const result = await db.delete(BOOK_ITEMS, { _id: new ObjectId(req.params.bookItemId)})
    res.status(204).json(result)
  } catch(e) {
    console.error(e)
    res.status(500).json({error: "internal server error"})
  }
}

module.exports = bookItemsController