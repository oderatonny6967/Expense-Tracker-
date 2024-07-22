const express = require('express');
const router = express.Router();
const connection = require('../config/database');

// Add Expense
router.post('/add', (req, res) => {
  const { user_id, amount, date, category } = req.body;

  const query = 'INSERT INTO Expenses (user_id, amount, date, category) VALUES (?, ?, ?, ?)';
  connection.query(query, [user_id, amount, date, category], (err, results) => {
    if (err) return res.status(500).send('Server error');
    res.status(201).send('Expense added');
  });
});

// View Expenses
router.get('/:user_id', (req, res) => {
  const { user_id } = req.params;

  const query = 'SELECT * FROM Expenses WHERE user_id = ?';
  connection.query(query, [user_id], (err, results) => {
    if (err) return res.status(500).send('Server error');
    res.status(200).json(results);
  });
});

module.exports = router;
