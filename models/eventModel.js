// models/eventModel.js

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/events.db');


db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    location TEXT NOT NULL
  )`);
});

class Event {
  static create(event, callback) {
    const stmt = db.prepare('INSERT INTO events (title, description, date, time, location) VALUES (?, ?, ?, ?, ?)');
    stmt.run(event.title, event.description, event.date, event.time, event.location, callback);
    stmt.finalize();
  }

  static getAll(callback) {
    db.all('SELECT * FROM events', callback);
  }

  static getById(id, callback) {
    db.get('SELECT * FROM events WHERE id = ?', [id], callback);
  }

  static update(id, event, callback) {
    const stmt = db.prepare('UPDATE events SET title=?, description=?, date=?, time=?, location=? WHERE id=?');
    stmt.run(event.title, event.description, event.date, event.time, event.location, id, callback);
    stmt.finalize();
  }

  static delete(id, callback) {
    db.run('DELETE FROM events WHERE id = ?', [id], callback);
  }
}

module.exports = Event;