const express = require('express');
const router = express.Router();

// GET login
router.get('/login', (req, res) => {
  const error = req.session.loginError || null;
  req.session.loginError = null; // 清除
  res.render('login', { error });
});

// POST login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === '1234') {
    req.session.user = username;
    res.redirect('/events');
  } else {
    req.session.loginError = 'Invalid username or password.';
    res.redirect('/login');
  }
});

// logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

module.exports = router;