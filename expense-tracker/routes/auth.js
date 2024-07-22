const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const connection = require('../config/database');

// Registration
router.post('/register', (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  const query = 'INSERT INTO Users (username, password) VALUES (?, ?)';
  connection.query(query, [username, hashedPassword], (err, results) => {
    if (err) return res.status(500).send('Server error');
    res.status(201).send('User registered');
  });
});

// Login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM Users WHERE username = ?';
  connection.query(query, [username], (err, results) => {
    if (err) return res.status(500).send('Server error');
    if (results.length === 0) return res.status(404).send('User not found');

    const user = results[0];
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) return res.status(401).send('Invalid password');

    res.status(200).send('User logged in');
  });
});

module.exports = router;
