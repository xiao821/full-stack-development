import db from '../utils/db'

export default defineNitroPlugin(() => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    );
    
  `)

  const exists = db.prepare('SELECT id FROM users WHERE username = ?').get('admin')
  if (!exists) {
    db.prepare('INSERT INTO users (username, password) VALUES (?, ?)').run('admin', '123456')
  }
})
