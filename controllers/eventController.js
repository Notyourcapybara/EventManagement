// controllers/eventController.js

const Event = require('../models/eventModel');

exports.showEventList = (req, res) => {
  Event.getAll((err, events) => {
    if (err) return res.status(500).send('Error loading events');
    res.render('eventList', { events });
  });
};

exports.addEventForm = (req, res) => {
  res.render('addEvent');
};

exports.addEvent = (req, res) => {
  const { title, description, date, time, location } = req.body;
  if (!title || !description || !date || !time || !location) {
    return res.send("All fields are required");
  }
  Event.create({ title, description, date, time, location }, (err) => {
    if (err) return res.send("Failed to add event");
    res.redirect('/events');
  });
};

exports.editEventForm = (req, res) => {
  Event.getById(req.params.id, (err, event) => {
    if (err || !event) return res.send("Event not found");
    res.render('editEvent', { event });
  });
};

exports.updateEvent = (req, res) => {
  const { title, description, date, time, location } = req.body;
  Event.update(req.params.id, { title, description, date, time, location }, (err) => {
    if (err) return res.send("Failed to update event");
    res.redirect('/events');
  });
};

exports.deleteEvent = (req, res) => {
  Event.delete(req.params.id, (err) => {
    if (err) return res.send("Failed to delete event");
    res.redirect('/events');
  });
};