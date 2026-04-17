const db = require('../config/database');

const Item = {
  findAll() {
    return db.prepare('SELECT * FROM items ORDER BY id ASC').all();
  },

  create({ name }) {
    const stmt = db.prepare('INSERT INTO items (name) VALUES (?)');
    const { lastInsertRowid } = stmt.run(name);
    return db.prepare('SELECT * FROM items WHERE id = ?').get(lastInsertRowid);
  },
};

module.exports = Item;
