const { ObjectId } = require("mongodb")
const Database = require("../models/dbClient")
const db = new Database()

const BOOKS = "books"

const booksController = {}

booksController.getAll = async (req, res) => {
  /*
    #swagger.tags = ['Books']
    #swagger.description = 'Returns all books from the database'
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
    res.status(200).json(book)
  } catch(e) {
    console.error(e)
    res.status(500).json({error: "internal server error"})
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
    #swagger.description = 'Delete a single book with the given ID'
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