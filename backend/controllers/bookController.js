const Book = require('../models/Book');
const Author = require('../models/Author');

// Create a new book
exports.createBook = async (req, res) => {
  const { title, ISBN, summary, publicationDate, genres, copiesAvailable, author } = req.body;
  const book = new Book({ title, ISBN, summary, publicationDate, genres, copiesAvailable, author });
  await book.save();

  await Author.findByIdAndUpdate(author, { $push: { books: book._id } });

  res.status(201).json(book);
};

// Get all books
exports.getBooks = async (req, res) => {
  const books = await Book.find().populate('author');
  res.json(books);
};

// Get book by ID
exports.getBookById = async (req, res) => {
  const book = await Book.findById(req.params.id).populate('author');
  if (!book) return res.status(404).json({ message: 'Book not found.' });
  res.json(book);
};

// Update book
exports.updateBook = async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!book) return res.status(404).json({ message: 'Book not found.' });
  res.json(book);
};

// Delete book
exports.deleteBook = async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  if (!book) return res.status(404).json({ message: 'Book not found.' });
  res.json({ message: 'Book deleted successfully.' });
};
