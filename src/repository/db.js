const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');


const DATA_DIR = path.resolve(__dirname, '../data');
const DB_FILE  = path.join(DATA_DIR, 'bot.db');
const MIGR_DIR = path.join(DATA_DIR, 'sql');
const db = new Database(DB_FILE);
db.exec(`
  CREATE TABLE IF NOT EXISTS _migrations (
    name TEXT PRIMARY KEY
  );
`);

for (const file of fs.readdirSync(MIGR_DIR).sort()){
    const existing = db.prepare(`SELECT 1 FROM _migrations WHERE name = ? LIMIT 1`).get(file)
    if (existing) continue;

    const sql = fs.readFileSync(path.join(MIGR_DIR, file), `utf8`)
    db.exec(sql);
    db.prepare(`INSERT INTO _migrations (name) VALUES (?)`).run(file);
}

module.exports = { db };
