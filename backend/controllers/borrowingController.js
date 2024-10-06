const Transaction = require('../models/Transaction');
const Book = require('../models/Book');
const User = require('../models/User');

// Borrow a book
exports.borrowBook = async (req, res) => {
  const { bookId, userId } = req.body;

  const book = await Book.findById(bookId);
  if (!book || book.copiesAvailable <= 0) {
    return res.status(400).json({ message: 'Book not available for borrowing.' });
  }

  const transaction = new Transaction({
    book: bookId,
    member: userId,
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
  });

  book.copiesAvailable -= 1;
  book.borrowedBy.push(userId);

  await transaction.save();
  await book.save();

  res.status(201).json(transaction);
};

// Return a book
exports.returnBook = async (req, res) => {
  const { transactionId } = req.body;

  const transaction = await Transaction.findById(transactionId);
  if (!transaction || transaction.status === 'Returned') {
    return res.status(400).json({ message: 'Invalid transaction.' });
  }

  transaction.returnDate = Date.now();
  transaction.status = 'Returned';

  const book = await Book.findById(transaction.book);
  book.copiesAvailable += 1;
  book.borrowedBy.pull(transaction.member);

  await transaction.save();
  await book.save();

  res.json(transaction);
};

// Get borrowing history
exports.getBorrowingHistory = async (req, res) => {
  const history = await Transaction.find({ member: req.params.userId })
    .populate('book')
    .populate('member');
  res.json(history);
};
