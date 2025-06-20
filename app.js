console.log("✅ app.js loaded");

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Routes
const eventRoutes = require('./routes/eventRoutes');
const authRoutes = require('./routes/authRoutes');

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true
}));

// 🔧 Debug route
app.get('/ping', (req, res) => {
  console.log('✅ 顶级 /ping 被访问了');
  res.send('pong!');
});

// Routes
app.use('/', authRoutes);
app.use('/events', eventRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});