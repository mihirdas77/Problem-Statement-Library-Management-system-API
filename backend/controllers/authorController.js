const Author = require('../models/Author');

// Create a new author
exports.createAuthor = async (req, res) => {
  const { name, biography, dateOfBirth, nationality } = req.body;
  const author = new Author({ name, biography, dateOfBirth, nationality });
  await author.save();
  res.status(201).json(author);
};

// Get all authors
exports.getAuthors = async (req, res) => {
  const authors = await Author.find();
  res.json(authors);
};

// Get author by ID
exports.getAuthorById = async (req, res) => {
  const author = await Author.findById(req.params.id).populate('books');
  if (!author) return res.status(404).json({ message: 'Author not found.' });
  res.json(author);
};

// Update author
exports.updateAuthor = async (req, res) => {
  const author = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!author) return res.status(404).json({ message: 'Author not found.' });
  res.json(author);
};

// Delete author
exports.deleteAuthor = async (req, res) => {
  const author = await Author.findByIdAndDelete(req.params.id);
  if (!author) return res.status(404).json({ message: 'Author not found.' });
  res.json({ message: 'Author deleted successfully.' });
};
