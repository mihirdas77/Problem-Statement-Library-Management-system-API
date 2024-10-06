const express = require('express');
const {
  borrowBook,
  returnBook,
  getBorrowingHistory,
} = require('../controllers/borrowingController');
const router = express.Router();

router.post('/borrow', borrowBook);
router.post('/return', returnBook);
router.get('/history/:userId', getBorrowingHistory);

module.exports = router;
