// Import necessary modules
const express = require('express');
const router = express.Router();
const LibraryTransaction = require('../models/LibraryTransaction');

// Get all library transactions
router.get('/', async (req, res) => {
  try {
    const transactions = await LibraryTransaction.find();
    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get library transactions for a specific user
router.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const transactions = await LibraryTransaction.find({ user: userId });
    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add a new library transaction
router.post('/', async (req, res) => {
  const { user, book, dueDate, transactionType } = req.body;

  try {
    const newTransaction = new LibraryTransaction({
      user,
      book,
      dueDate,
      transactionType,
    });
    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a library transaction by ID
router.patch('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const transaction = await LibraryTransaction.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    res.json(transaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a library transaction by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const transaction = await LibraryTransaction.findByIdAndDelete(id);

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    res.json(transaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
