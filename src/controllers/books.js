const { ObjectId } = require("mongodb")
const Database = require("../models/dbClient")
const db = new Database()

const BOOKS = "books"
const BOOK_ITEMS = "bookItems"
const AUTHORS = "authors"

const booksController = {}

booksController.getAll = async (req, res) => {
  /*
    #swagger.tags = ['Books']
    #swagger.description = 'Return all books from the database'
    #swagger.responses[200] = { description: 'Books retrieved successfully' }
    #swagger.responses[500] = { description: 'Internal server error (databse or node)' }
  */
  try {
    const books = await db.get("books")
    res.status(200).json(books)
  } catch (e) {
    console.error(e)
    res.status(500).json({error: "internal server error"})
  }
}

booksController.get = async (req, res) => {
  /*
    #swagger.tags = ['Books']
    #swagger.description = 'Returns a single book with the given ID'
    #swagger.responses[200] = { description: 'Book with the given id retrieval successfully' }
    #swagger.responses[500] = { description: 'Internal server error (databse or node)' }
  */
  try {
    const book = await db.get(BOOKS, {_id: new ObjectId(req.params.book_id)})
    const items = await db.get(BOOK_ITEMS, { bookId: book[0]._id.toString()})
    book[0].stock = items.length
    res.status(200).json(book)
  } catch(e) {
    console.error(e)
    res.status(500).json({error: "internal server error"})
  }
}

booksController.getItems = async (req, res) => {
  /*
    #swagger.tags = ['Books']
    #swagger.description = 'Returns the book informatoin and all the copies available'
    #swagger.responses[200] = { description: 'Data with the given id retrieved successfully' }
    #swagger.responses[500] = { description: 'Internal server error (databse or node)' }
  */
  try {
    const book = await db.get(BOOKS, { _id: new ObjectId(req.params.book_id)})
    const items = await db.get(BOOK_ITEMS, { bookId: book[0]._id.toString()})
    const cleanedItems = items.filter( item => {
      delete item.bookId
      return item.discarded == false
    })
    book[0].stock = cleanedItems.length
    book[0].items = cleanedItems 
    res.status(200).json(book)
  } catch(e) {
    console.error(e)
    res.status(500).json({error: "internal server error"})
  }
}

booksController.getDetails = async (req, res) => {
  /*
    #swagger.tags = ['Books']
    #swagger.description = 'Returns the book including the author information'
    #swagger.responses[200] = { description: 'Book information retrieved successfully' }
    #swagger.responses[500] = { description: 'Internal server error (databse or node)' }
  */
  try {
    const book = await db.get(BOOKS, { _id: new ObjectId(req.params.book_id)})
    const author = await db.get(AUTHORS, { _id: new ObjectId(book[0].authorId)})
    delete book[0].authorId
    book[0].author = author[0]
    res.status(200).json(book)
  } catch (e) {
    console.error(e)
    res.status(500).json(e)
  }
}

booksController.post = async (req, res) => {
  /*
    #swagger.tags = ['Books']
    #swagger.description = 'Inserts a new book to the database'
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Json containing book data',
      schema:   {
        "title": "Harry Potter and the Goblet of Fire",
        "authorId": "4",
        "isbn": "9780439139601",
        "edition": "Paperback",
        "pubDate": "2000-07-08",
        "genre": "Fantasy",
        "cover": "https://m.media-amazon.com/images/I/91-LL7OnDCL._AC_UF1000,1000_QL80_.jpg"
      }
    }
    #swagger.responses[200] = { description: 'New book created successfully' }
    #swagger.responses[500] = { description: 'Internal server error (databse or node)' }
  */
  try {
    const result = await db.post(BOOKS, req.body)
    res.status(200).json(result)
  } catch(e) {
    console.error(e)
    res.status(500).json({error: "internal server error"})
  }
}

booksController.put = async (req, res) => {
  /*
    #swagger.tags = ['Books']
    #swagger.description = 'Updates an existing book'
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Json containing book data',
      schema:   {
        "edition": "Paperback",
        "genre": "Fantasy",
      }
    }
    #swagger.responses[200] = { description: 'Book updated successfully' }
    #swagger.responses[500] = { description: 'Internal server error (databse or node)' }
  */
  try {
    const result = await db.put(BOOKS, {_id: new ObjectId(req.params.book_id)}, {$set: req.body})
    res.status(204).json(result)
  } catch(e) {
    console.error(e)
    res.status(500).json({error: "internal server error"})
  }
}

booksController.delete = async (req, res) =>{
  /*
    #swagger.tags = ['Books']
    #swagger.description = 'Deletes a single book with the given ID'
    #swagger.responses[200] = { description: 'Book with the given id deleted successfully' }
    #swagger.responses[500] = { description: 'Internal server error (databse or node)' }
  */
  try {
    const result = await db.delete(BOOKS, {_id: new ObjectId(req.params.book_id)})
    res.status(204).json(result)
  } catch(e) {
    console.error(e)
    res.status(500).json({error: "internal server error"})
  }
}

module.exports = booksController