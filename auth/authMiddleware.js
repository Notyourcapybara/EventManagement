function ensureAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    return next(); // Proceed if user is logged in
  }

  // Redirect with optional error message
  res.render('login', { error: 'Please log in to continue' });
}

module.exports = { ensureAuthenticated };