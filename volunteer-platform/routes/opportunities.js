const express = require('express');
const router = express.Router();
const db = require('../database');

// List all opportunities
router.get('/', async (req, res) => {
  try {
    const [opportunities] = await db.query(`
      SELECT o.*, u.email as organizer_email 
      FROM opportunities o
      JOIN users u ON o.user_id = u.id
    `);
    res.render('opportunities', { 
      opportunities,
      user: req.session.user 
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Show opportunity details
router.get('/:id', async (req, res) => {
  try {
    const [opportunities] = await db.query(`
      SELECT o.*, u.email as organizer_email 
      FROM opportunities o
      JOIN users u ON o.user_id = u.id
      WHERE o.id = ?
    `, [req.params.id]);
    
    if (opportunities.length === 0) {
      return res.status(404).send('Opportunity not found');
    }
    
    res.render('opportunity-detail', { 
      opportunity: opportunities[0],
      user: req.session.user 
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Create new opportunity (form)
router.get('/new', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  res.render('post-opportunity', { user: req.session.user });
});

// Create new opportunity (submit)
router.post('/', async (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }

  try {
    const { title, description, location, date } = req.body;
    await db.query(
      'INSERT INTO opportunities (title, description, location, date, user_id) VALUES (?, ?, ?, ?, ?)',
      [title, description, location, date, req.session.user.id]
    );
    res.redirect('/opportunities');
  } catch (err) {
    console.error(err);
    res.render('post-opportunity', { 
      error: 'Failed to create opportunity',
      user: req.session.user 
    });
  }
});

module.exports = router;