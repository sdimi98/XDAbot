const { db } = require('./db');

const SAVE_USER = `INSERT OR IGNORE INTO users (id, username, guild_id) VALUES (?, ?, ?)`;

function saveUser(userId, username, guildId) {
    return db.prepare(SAVE_USER).run(userId, username, guildId);
}

module.exports = { saveUser }