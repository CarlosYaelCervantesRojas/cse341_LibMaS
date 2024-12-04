const { ObjectId } = require("mongodb")
const Database = require("../models/dbClient")
const db = new Database()

const BOOKS = "books"

const booksController = {}

booksController.getAll = async (req, res) => {
  // #swagger.tags = ['Books']
  try {
    const books = await db.get("books")
    res.status(200).json(books)
  } catch (e) {
    console.error(e)
  }
}

booksController.get = async (req, res) => {
  // #swagger.tags = ['Books']
  try {
    const book = await db.get(BOOKS, {_id: new ObjectId(req.params.book_id)})
    res.status(200).json(book)
  } catch(e) {
    console.error(e)
  }
}

booksController.post = async (req, res) => {
  // #swagger.tags = ['Books']
  try {
    const result = await db.post(BOOKS, req.body)
    res.status(200).json(result)
  } catch(e) {
    console.error(e)
  }
}

booksController.put = async (req, res) => {
  // #swagger.tags = ['Books']
  try {
    const result = await db.put(BOOKS, {_id: new ObjectId(req.params.book_id)}, {$set: req.body})
    res.status(204).json(result)
  } catch(e) {
    console.error(e)
  }
}

module.exports = booksController