const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../database');

// Login route
router.get('/login', (req, res) => {
  res.render('login', { error: null });
});

router.post('/login', async (req, res) => {
  try {
    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [req.body.email]);
    if (users.length === 0) {
      return res.render('login', { error: 'Invalid credentials' });
    }

    const match = await bcrypt.compare(req.body.password, users[0].password);
    if (!match) {
      return res.render('login', { error: 'Invalid credentials' });
    }

    req.session.user = users[0];
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.render('login', { error: 'Login failed' });
  }
});

// Register route
router.get('/register', (req, res) => {
  res.render('register', { error: null });
});

router.post('/register', async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    await db.query(
      'INSERT INTO users (email, password, role) VALUES (?, ?, ?)',
      [email, hashedPassword, role || 'volunteer']
    );
    
    res.redirect('/login');
  } catch (err) {
    console.error(err);
    res.render('register', { error: 'Registration failed' });
  }
});

// Logout route
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;