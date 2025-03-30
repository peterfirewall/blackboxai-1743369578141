require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const { db } = require('./database');

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SESSION_SECRET || 'hackathon-secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes
app.use('/', require('./routes/auth'));
app.use('/opportunities', require('./routes/opportunities'));

// Home route
app.get('/', (req, res) => {
  res.render('index', { 
    title: 'Volunteer Platform',
    user: req.session.user 
  });
});

// Database connection and server start
db.on('error', (err) => {
  console.error('Database error:', err);
});

db.on('open', () => {
  console.log('Database connected successfully');
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

// Error handling
process.on('unhandledRejection', err => {
  console.error('Unhandled rejection:', err);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { 
    message: 'Something went wrong!',
    error: err
  });
});