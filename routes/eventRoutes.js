console.log('✅ eventRoutes.js loaded');

const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');


router.get('/ping', (req, res) => {
  console.log('✅ /events/ping 被访问了');
  res.send('pong!');
});


router.get('/', eventController.showEventList);
router.get('/add', eventController.addEventForm);
router.post('/add', eventController.addEvent);
router.get('/edit/:id', eventController.editEventForm);
router.post('/edit/:id', eventController.updateEvent);
router.post('/delete/:id', eventController.deleteEvent);


module.exports = router;